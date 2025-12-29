import React from 'react';

const DisclaimerFooter = () => {
  return (
    <footer className="py-4 px-6 bg-red-500 text-white text-center sticky bottom-0 w-full">
      <div className="max-w-4xl mx-auto">
        <p className="font-medium">
          ⚠️ 重要声明：本工具仅为辅助理解参考，不可替代专业医疗诊断！解读结果由AI生成，不代表医生意见。
        </p>
      </div>
    </footer>
  );
};

export default DisclaimerFooter;