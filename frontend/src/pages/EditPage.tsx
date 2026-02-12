import { Loader } from '@components/components/Loader';
import { useDashboard } from '@hooks/DashboardContext';
import { fetchDashboardData } from '@service/dashboard.service';
import { axiosClient } from '../api/axiosClient';
import { CategoriesTransactions, ReviewData, UpdateCategoryRequest } from 'DTO/dashboard.dto';
import React, { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react';
import { Button } from '@components/components/ui/button';
import { NewCategory } from '@components/components/newCategory';
import { useNavigate } from 'react-router';
import EditedTxns from '@components/components/EditedTxns';

const EditPage = () => {
  const [data,setData] = useState<ReviewData | null>(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<string>("");
  const [categoryTxnId, setCategoryTxnId] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [editedTransactions, setEditedTransactions] = useState<UpdateCategoryRequest[] | []>([]);
  const [originalTxns, setOriginalTxns] = useState<CategoriesTransactions[]>([]);
  const [showDropDown, setShowDropDown] = useState(false);
  
  const navigate = useNavigate();

  const uniqueCategories = Array.from(
    new Set(data?.transactions.map(txn=> txn?.category))
  ).sort();

  const filteredTxns = React.useMemo(()=> {
    return data?.transactions.filter(txn => txn?.category === selectedCategory) || [];
  },[selectedCategory,data]);

  const handleCategoryChange = (
      tempId: string,
      category: string
      ) => {
        if(!data) return;
        setData(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            transactions: prev.transactions.map(txn=> txn.tempId === tempId ? {...txn, category} : txn),
          };
      });
      // Find Original Category for the transaction using tempId and update editedTransactions state
      
      const originalTxn = originalTxns.find(txn => txn.tempId === tempId);
      if(!originalTxn) return;
      const originalCategory = originalTxn.category;
      // Update the EditedTransctions state based on the 3 scenarios: 
      setEditedTransactions(prev => {
        // 1. If new category reverted back to original category,remove it from editedTrasactions (if exists)
        const alreadyEdited = prev.find(e => e.tempId === tempId);
        if(newCategory === originalCategory){
          return prev.filter(e => e.tempId !== tempId);
        }
        // 2. If already edited, update it! 
        if(alreadyEdited){
          return prev.map(e => e.tempId === tempId ? {...e, newCategory} : e);
        }

        //3. If not edited before, add it ! 
        return [...prev,{tempId, category: newCategory}];
      });
     
  };

  const editedTxnPreview = React.useMemo(()=> {
    if(!data) return [];
    return editedTransactions.map(edit => {
      const currentTxn = data.transactions.find(t => t.tempId === edit.tempId);
      const ogTxn = originalTxns.find(t => t.tempId === edit.tempId);
      return{
        tempId: edit.tempId,
        txnDate: currentTxn?.txnDate,
        description: currentTxn?.description,
        amount: currentTxn?.amount,
        previousCategory: ogTxn?.category,
        newCategory: currentTxn?.category,
      }
    });
  },[editedTransactions, data, originalTxns]);

  const handleBulkConfirm = async () => {
    if (editedTransactions.length === 0) return;

    try {
      await axiosClient.patch("/review", {
        updates: editedTransactions,
      });

      // After successful patch
      setOriginalTxns(data?.transactions || []);
      setEditedTransactions([]);

      alert("Draft Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update transactions");
    }
};

  const handleUndoAll = () => {
    if(!data) return;
    setEditedTransactions([]);
    // setData(prev => {
    //   if(!prev) return prev;
    //   return {
    //     ...prev,
    //     transactions: prev.transactions.map(txn => {
    //       const original = originalTxns.find(ot => ot.tempId === txn.tempId);
    //       return original ? {...txn, category: original.category} : txn;
    //     }),
    //   };
    // }); 
  }

  useEffect(()=> {
      const fetchReview = async() => {
        try{
          const response = await axiosClient.get("/analyze");
          const reviewData = response.data.data;
          setData(reviewData);
          setOriginalTxns(reviewData.transactions);
        }catch(error){
          setError("Failed to fetch review data");
        }finally{
          setLoading(false);
        }
      }
      fetchReview();
      
  },[]);

  useEffect(() => {
    if (!data) return;

    const cats = Array.from(
      new Set(data.transactions.map(txn => txn.category))
    ).sort();

    setCategories(cats);
   
  }, [data]);

  
  if(loading) return <Loader />;
  if(error) return <div className='text-red-500'>{error}</div>; 

  return (
    <>
    <div className='dark w-full h-100%'>
    <div className="w-full h-full p-6 bg-background">
      <header className="mb-6 text-center w-full h-auto">
        <h1 className="text-2xl font-semibold text-white">
          AI-Categorized Transactions
        </h1>
        <h2 className="text-sm text-gray-400">
          Edit categories before confirming. The "Edited transactions" once saved, cannot be changed later.
        </h2>
        {editedTransactions.length > 0 && (
          <div className="mt-6 text-xs text-green-400">
            Edited Count: {editedTransactions.length}
        </div>
          
        )}
        <div className='flex flex-wrap gap-3 justify-center items-center'>
        {categories.length > 0 && categories.map(category =>(
          <Button
            key={category}
            onClick={()=> setSelectedCategory(category)}
            className="px-4 py-2 bg-secondary rounded-lg text-gray-300 hover:text-black gap-2 mt-5 ml-3 items-center w-fit
            hover:scale-105 transition-transform active:focus:outline-2 active:focus:outline-white">
              {category}
          </Button>
        ) )}
        {/* <Button className="px-4 py-2 bg-secondary rounded-lg text-gray-300 hover:text-black gap-2 mt-5 ml-3 items-center w-fit
            hover:scale-105 transition-transform active:focus:outline-2 active:focus:outline-white"
            title='Add New Category'>
          +
        </Button> */}
        </div>
      </header>
      
      {selectedCategory && (
              <table className="mt-10 w-full max-w-4xl mx-auto text-white border-2 border-gray-500 rounded-lg">
                <thead className='bg-gray-900 font-normal text-left'>
                  <tr>
                    <th className='p-1'>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
      
                <tbody>
                  {filteredTxns.map((txn, index) => {      
                    return (
                      <tr key={txn.tempId} className='m-2 p-2'>
                        <td className='p-2'>{txn.txnDate}</td>
                        <td>{txn.description}</td>
                        <td className="flex items-center gap-2 m-1">
                          <select
                            value={txn.category}
                            onChange={(e) => {
                              if(e.target.value === "__New_Category__"){
                                setCategoryTxnId(txn.tempId);
                                return;
                              }
                              handleCategoryChange(txn.tempId,e.target.value)
                            }}
                            className="bg-background border rounded px-2 py-1 mt-1"
                          >
                            {categories.map(cat => (
                              <option key={cat} value={cat} >
                                {cat}
                              </option>    
                            ))}
                            <option value="__New_Category__"> 
                              + Add New Category
                              </option>
                          </select>
                          <Pencil className="h-4 w-4 opacity-60" />
                        </td>
      
                        <td className="text-center">{txn.amount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {/* This section is for the sheets component */}
            <NewCategory
              open={categoryTxnId !== null}
              onClose={() => setCategoryTxnId(null)}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              onSave={(categoryName) => {
                if (!categoryTxnId) return;

                setCategories(prev =>
                  prev.includes(categoryName)
                    ? prev
                    : [...prev, categoryName].sort()
                );

                setData(prev => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    transactions: prev.transactions.map(txn =>
                      txn.tempId === categoryTxnId
                        ? { ...txn, category: categoryName }
                        : txn
                    ),
                  };
                });

                setSelectedCategory(categoryName);
                setCategoryTxnId(null);
                setNewCategory("");
              }}
            />
            <div className='w-full h-auto mx-auto flex justify-center items-center'>
            <Button className='cursor-pointer hover:scale-105 transition-transform-all items-center mt-10' 
            onClick={()=> setShowDropDown(!showDropDown)}>{showDropDown ? "Showing Edited Transactions": "View Edited Transactions"}</Button>
            </div>
            {showDropDown ? editedTxnPreview.length > 0 ? (
              <div className='w-full h-auto mt-10 flex flex-col justify-center items-center gap-4'>
                <EditedTxns editedTxnPreview={editedTxnPreview} handleBulkConfirm={handleBulkConfirm} handleUndoAll = {handleUndoAll}/>
              </div> ) : (<p className='text-gray-400 text-sm font-small text-center mt-4'>No Edited Transaction to Show</p>) :
             null
            }
    </div>
    </div>
    </>
  );
}

export default EditPage