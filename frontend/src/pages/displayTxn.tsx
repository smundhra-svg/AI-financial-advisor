import { useDashboardData } from '@hooks/useDashboardData';
import React from 'react'
import { Pencil } from 'lucide-react';
import { useDashboard } from '@components/components/DashboardContext';

const DisplayTxn = () => {
const { data, setData,loading, error } = useDashboard();
  const [selectedCategory, setSelectedCategory] =
    React.useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return null;

  const uniqueCategories = Array.from(
    new Set(data.categories.map(txn => txn.category))
  ).sort();

  const filteredTxns = React.useMemo(() => {
    if (!selectedCategory) return [];
    return data.categories.filter(
      txn => txn.category === selectedCategory
    );
  }, [selectedCategory, data]);

  const handleCategoryChange = (
      txnIndex: number,
      newCategory: string
      ) => {
        setData(prev => {
          if (!prev) return prev;

            const updatedCategories = [...prev.categories];
            updatedCategories[txnIndex] = {
              ...updatedCategories[txnIndex],
              category: newCategory,
          };

          return {
            ...prev,
            categories: updatedCategories,
          };
      });
  };

    return (
    <div className="dark bg-background p-4">
      <div className="flex flex-wrap gap-3 justify-center">
        {uniqueCategories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="px-4 py-2 bg-secondary rounded-lg text-white"
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <table className="mt-6 w-full max-w-4xl mx-auto text-white border">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {filteredTxns.map((txn, index) => {
              const globalIndex = data.categories.findIndex(
                t => t === txn
              );

              return (
                <tr key={globalIndex}>
                  <td>{txn.txnDate}</td>

                  <td className="flex items-center gap-2">
                    <select
                      value={txn.category}
                      onChange={(e) =>
                        handleCategoryChange(
                          globalIndex,
                          e.target.value
                        )
                      }
                      className="bg-background border rounded px-2 py-1"
                    >
                      {uniqueCategories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <Pencil className="h-4 w-4 opacity-60" />
                  </td>

                  <td className="text-right">{txn.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DisplayTxn