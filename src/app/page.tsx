import React, { useState, useEffect } from 'react';

export default function HomePage() {
  // 各入力項目を state で管理
  const [priceType, setPriceType] = useState<string>('minus');
  const [recordTitle, setRecordTitle] = useState<string>('');
  const [recordDate, setRecordDate] = useState<string>('');
  const [recordPrice, setRecordPrice] = useState<number | undefined>(undefined);
  const [recordNotion, setRecordNotion] = useState<number | undefined>(undefined);

  // フォームの登録ボタンクリック時にローカルストレージへ保存
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 未入力項目があればアラート
    if (!recordTitle || !recordDate || !recordPrice) {
      alert("すべてのフィールドを入力してください");
      return;
    }

    // 一意のIDを生成
    const uniqueId = Date.now();

    // 保存データをオブジェクト形式に
    const newRecord = {
      id: uniqueId,
      type: priceType,
      title: recordTitle,
      date: recordDate,
      price: recordPrice,
      notion: recordNotion,
    };

    // ローカルストレージに保存
    const existingRecords = JSON.parse(localStorage.getItem('records') || '[]');
    localStorage.setItem('records', JSON.stringify([...existingRecords, newRecord]));

    // フォームをクリア
    setPriceType('minus');
    setRecordTitle('');
    setRecordDate('');
    setRecordPrice(undefined);
    setRecordNotion(undefined);

    alert("登録が完了しました");
  };

  return (
    <div className="form inner">
      <form onSubmit={handleSubmit}>
        <div>
          <h2 className="title" data-heading="registran">出金登録</h2>

          <div className="question-item">
            <label className="input">
              <select
                name="price-type"
                value={priceType}
                onChange={(e) => setPriceType(e.target.value)}
              >
                <option value="plus">収入</option>
                <option value="minus">支出</option>
              </select>
            </label>
          </div>

          <div className="question-item">
            <label>
              <span className="question-title">項目名</span>
              <input
                type="text"
                name="record-title"
                className="input"
                value={recordTitle}
                onChange={(e) => setRecordTitle(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="question-item">
            <input
              type="date"
              name="record-date"
              className="input"
              value={recordDate}
              onChange={(e) => setRecordDate(e.target.value)}
            />
          </div>

          <div className="question-item flex">
            <input
              type="number"
              name="record-price"
              className="input text-right"
              placeholder="1000"
              value={recordPrice || ''}
              onChange={(e) => setRecordPrice(Number(e.target.value))}
            />
            <span>&nbsp;円</span>
          </div>

          <div className="question-item flex">
            <label>
              <span className="question-title">メモ</span>
              <input
                type="number"
                name="record-notion"
                className="input text-right"
                placeholder="メモ"
                value={recordNotion || ''}
                onChange={(e) => setRecordNotion(Number(e.target.value))}
              />
              <span>&nbsp;円</span>
            </label>
          </div>

          <button type="submit" className="submit-button">
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
