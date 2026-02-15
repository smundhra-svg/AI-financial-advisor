import React from 'react'
import { Button } from './ui/button';
import { AlertModal } from './alertModal';

interface EditedTxnItem {
    tempId: string;
    txnDate?: string;
    description?: string;
    amount?: number;
    previousCategory?: string;
    newCategory?: string;
}

interface EditedTxnsProps {
    editedTxnPreview: EditedTxnItem[];
    handleBulkConfirm: () => Promise<void>;
    handleUndoAll : () => void;
}

const EditedTxns = ({editedTxnPreview, handleBulkConfirm, handleUndoAll}: EditedTxnsProps) => {

  return (
    <>
        <div className='w-full h-auto items-center-safe'>
        {editedTxnPreview.length > 0 && (
        <div className="mt-12 max-w-5xl mx-auto">
            <h2 className="text-md font-light text-yellow-400 mb-4">
            Edited Transactions (Review Before Confirming)
            </h2>

            <table className="w-full text-white border border-yellow-500">
            <thead className="bg-yellow-900 text-left">
                <tr>
                <th className="p-2">Date</th>
                <th>Description</th>
                <th>Old Category</th>
                <th>New Category</th>
                <th>Amount</th>
                </tr>
            </thead>

            <tbody>
                {editedTxnPreview.map(txn => (
                <tr key={txn.tempId} className="border-t border-gray-700">
                    <td className="p-2">{txn.txnDate}</td>
                    <td>{txn.description}</td>
                    <td className="text-red-400">{txn.previousCategory}</td>
                    <td className="text-green-400">{txn.newCategory}</td>
                    <td>{txn.amount}</td>
                </tr>
                ))}
            </tbody>
            </table>

            <div className="flex justify-center mt-6 gap-3">
            <AlertModal handleBulkConfirm={handleBulkConfirm}/> 
            <Button variant='destructive'
            onClick={handleUndoAll}
            className="hover:scale-105 transition-transform cursor-pointer">
              Undo All
            </Button>
            </div>
        </div>
        
        )}
        </div>
    </>
  )
}

export default EditedTxns