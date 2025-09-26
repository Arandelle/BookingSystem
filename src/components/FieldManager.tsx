import React, { useState } from 'react';
import { FormField } from '@/types/booking';

interface FieldManagerProps {
  fields: FormField[];
  onAddField: (field: FormField) => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onDeleteField: (fieldId: string) => void;
}

export const FieldManager: React.FC<FieldManagerProps> = ({
  fields,
  onAddField,
  onUpdateField,
  onDeleteField
}) => {
  const [isAddingField, setIsAddingField] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<FormField>>({});
  const [newField, setNewField] = useState<Partial<FormField>>({
    label: '',
    type: 'text',
    required: false
  });

  const fieldTypes = [
    { value: 'text', label: 'Text' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Phone' },
    { value: 'date', label: 'Date' },
    { value: 'time', label: 'Time' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'select', label: 'Select' }
  ];

  // Add new field
  const handleAddField = () => {
    if (newField.label && newField.type) {
      const field: FormField = {
        id: Date.now().toString(),
        label: newField.label,
        type: newField.type as FormField['type'],
        required: newField.required || false,
        options: newField.type === 'select' ? ['Option 1', 'Option 2'] : undefined
      };
      onAddField(field);
      setNewField({ label: '', type: 'text', required: false });
      setIsAddingField(false);
    }
  };

  // Start editing
  const startEditing = (field: FormField) => {
    setEditingField(field.id);
    setEditDraft({ ...field });
  };

  // Save edit
  const saveEdit = () => {
    if (editingField && editDraft) {
      onUpdateField(editingField, editDraft);
    }
    setEditingField(null);
    setEditDraft({});
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Form Fields</h3>
        <button
          onClick={() => setIsAddingField(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Field
        </button>
      </div>

      {/* Add new field form */}
      {isAddingField && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-3">Add New Field</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
              <input
                type="text"
                value={newField.label || ''}
                onChange={(e) => setNewField(prev => ({ ...prev, label: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Field label"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={newField.type || 'text'}
                onChange={(e) => setNewField(prev => ({ ...prev, type: e.target.value as FormField['type'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {fieldTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="required"
                checked={newField.required || false}
                onChange={(e) => setNewField(prev => ({ ...prev, required: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="required" className="text-sm font-medium text-gray-700">Required</label>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsAddingField(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddField}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Field
            </button>
          </div>
        </div>
      )}

      {/* Existing fields list */}
      <div className="space-y-3">
        {fields.map(field => (
          <div
            key={field.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex-1">
              {editingField === field.id ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Edit label */}
                  <input
                    type="text"
                    value={editDraft.label || ''}
                    onChange={(e) => setEditDraft(prev => ({ ...prev, label: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {/* Edit type */}
                  <select
                    value={editDraft.type || 'text'}
                    onChange={(e) => setEditDraft(prev => ({ ...prev, type: e.target.value as FormField['type'] }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {fieldTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  {/* Edit required */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editDraft.required || false}
                      onChange={(e) => setEditDraft(prev => ({ ...prev, required: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="text-sm font-medium text-gray-700">Required</label>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900">{field.label}</span>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">{field.type}</span>
                  {field.required && (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded">Required</span>
                  )}
                </div>
              )}
            </div>
            {/* Actions */}
            <div className="flex items-center space-x-2 ml-4">
              {editingField === field.id ? (
                <>
                  <button
                    onClick={() => setEditingField(null)}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(field)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteField(field.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
