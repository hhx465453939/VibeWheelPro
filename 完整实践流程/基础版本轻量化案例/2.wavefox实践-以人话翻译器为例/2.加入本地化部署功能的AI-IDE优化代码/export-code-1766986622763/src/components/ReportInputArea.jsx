import React from 'react';
import { Upload } from 'lucide-react';

const ReportInputArea = ({ activeTab, inputContent, setInputContent, triggerFileInput, fileInputRef, handleFileUpload }) => {
  return (
    <div className="p-6">
      {activeTab === 'text' ? (
        <div>
          <label htmlFor="report-text" className="block text-sm font-medium text-gray-700 mb-2">
            请粘贴您的医学报告内容
          </label>
          <textarea
            id="report-text"
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            placeholder="例如：白细胞计数: 12.5 ↑ 淋巴细胞百分比: 18.3 ↓ ..."
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
          />
        </div>
      ) : (
        <div className="text-center py-8">
          <div 
            className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={triggerFileInput}
          >
            <Upload className="h-8 w-8 text-gray-500" />
          </div>
          <p className="mt-4 text-sm text-gray-600">
            点击上传{activeTab === 'image' ? '图片' : 'PDF'}文件，或将文件拖拽到此处
          </p>
          <p className="text-xs text-gray-500 mt-1">
            支持 JPG, PNG, PDF 格式，文件大小不超过 10MB
          </p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={activeTab === 'image' ? 'image/*' : '.pdf'}
            onChange={handleFileUpload}
          />
        </div>
      )}
    </div>
  );
};

export default ReportInputArea;