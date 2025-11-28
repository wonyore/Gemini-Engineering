import React, { useState, useEffect } from 'react';

interface EditableSectionProps {
  title: string;
  initialContent: string;
  placeholder?: string;
  onSave: (content: string) => void;
  icon: React.ReactNode;
}

const EditableSection: React.FC<EditableSectionProps> = ({ 
  title, 
  initialContent, 
  placeholder, 
  onSave,
  icon 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSave = () => {
    onSave(content);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
            isEditing 
              ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-md' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {isEditing ? '保存' : '编辑'}
        </button>
      </div>

      <div className="flex-grow">
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full min-h-[150px] p-4 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none resize-none text-slate-700 bg-rose-50/30"
            placeholder={placeholder}
          />
        ) : (
          <div className="prose prose-rose max-w-none text-slate-600 whitespace-pre-line min-h-[150px]">
            {content || <span className="text-slate-400 italic">{placeholder}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableSection;