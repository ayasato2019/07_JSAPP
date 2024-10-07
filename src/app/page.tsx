'use client'; // クライアントコンポーネントであることを明示

import { useEffect, useState, FormEvent } from 'react';

// レコードの型定義
interface Record {
    rcordType: string;
    rcordTitle: string;
    recordDate: string;
    recordPrice: string;
    recordNotion: string;
}

export default function HomePage() {
    const [records, setRecords] = useState<Record[]>([]); // 保存されたレコードの配列

    // ページが初期表示されたときに、localStorageからデータを取得してセットする
    useEffect(() => {
        const storedRecords = JSON.parse(localStorage.getItem('records') || '[]') as Record[];
        setRecords(storedRecords); // 取得したデータを state にセット

        // フォームのデータをセットする処理（前回保存されたデータ）
        const storedType = localStorage.getItem('rcordType');
        const storedTitle = localStorage.getItem('rcordTitle');
        const storedDate = localStorage.getItem('recordDate');
        const storedPrice = localStorage.getItem('recordPrice');
        const storedNotion = localStorage.getItem('recordNotion');

        // 各フォームの値に前回の保存データを設定
        if (storedType) (document.querySelector('#price-type') as HTMLSelectElement).value = storedType;
        if (storedTitle) (document.querySelector('#record-title') as HTMLInputElement).value = storedTitle;
        if (storedDate) (document.querySelector('#record-date') as HTMLInputElement).value = storedDate;
        if (storedPrice) (document.querySelector('#record-price') as HTMLInputElement).value = storedPrice;
        if (storedNotion) (document.querySelector('#record-notion') as HTMLInputElement).value = storedNotion;
    }, []);

    // フォーム送信時にlocalStorageに保存する
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // ページリロードを防ぐ

        // 各フォーム要素の値を取得
        const rcordType = (document.querySelector('#price-type') as HTMLSelectElement).value;
        const rcordTitle = (document.querySelector('#record-title') as HTMLInputElement).value;
        const recordDate = (document.querySelector('#record-date') as HTMLInputElement).value;
        const recordPrice = (document.querySelector('#record-price') as HTMLInputElement).value;
        const recordNotion = (document.querySelector('#record-notion') as HTMLInputElement).value;

        // 新しいレコードを作成
        const newRecord: Record = {
            rcordType,
            rcordTitle,
            recordDate,
            recordPrice,
            recordNotion,
        };

        // 既存のレコードを取得し、新しいレコードを追加
        const updatedRecords = [...records, newRecord];
        setRecords(updatedRecords);

        // localStorageに保存（配列を文字列に変換）
        localStorage.setItem('records', JSON.stringify(updatedRecords));
    };

    // レコード削除の処理
    const handleDelete = (index: number) => {
        const updatedRecords = records.filter((_, i) => i !== index);
        setRecords(updatedRecords);
        localStorage.setItem('records', JSON.stringify(updatedRecords));
    };

    // 各エリアにレコードを表示する
    const renderRecords = (filterType: string) => {
        return records
            .filter((record) => filterType === 'all' || record.rcordType === filterType)
            .map((record, index) => (
                <li key={index} className=''>
                    <details className="accordion">
                        <summary>{record.recordDate} {record.rcordTitle} {record.recordPrice}円</summary>
                        <p>{record.recordNotion}</p>
                    </details>
                    <button className='delet-button' onClick={() => handleDelete(index)}>
                        <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{width: '16px', height: '16px', opacity: 1}} xmlSpace="preserve">
                        <g>
                            <path className="st0" d="M88.594,464.731C90.958,491.486,113.368,512,140.234,512h231.523c26.858,0,49.276-20.514,51.641-47.269
                                l25.642-335.928H62.952L88.594,464.731z M329.183,221.836c0.357-5.876,5.4-10.349,11.277-9.992
                                c5.877,0.357,10.342,5.409,9.993,11.277l-10.129,202.234c-0.357,5.876-5.4,10.342-11.278,9.984
                                c-5.876-0.349-10.349-5.4-9.992-11.269L329.183,221.836z M245.344,222.474c0-5.885,4.772-10.648,10.657-10.648
                                c5.885,0,10.656,4.763,10.656,10.648v202.242c0,5.885-4.771,10.648-10.656,10.648c-5.885,0-10.657-4.763-10.657-10.648V222.474z
                                M171.531,211.844c5.876-0.357,10.92,4.116,11.278,9.992l10.137,202.234c0.357,5.869-4.116,10.92-9.992,11.269
                                c-5.869,0.357-10.921-4.108-11.278-9.984l-10.137-202.234C161.182,217.253,165.654,212.201,171.531,211.844z" style={{fill: 'rgb(255, 255, 255)'}}></path>
                            <path className="st0" d="M439.115,64.517c0,0-34.078-5.664-43.34-8.479c-8.301-2.526-80.795-13.566-80.795-13.566l-2.722-19.297
                                C310.388,9.857,299.484,0,286.642,0h-30.651H225.34c-12.825,0-23.728,9.857-25.616,23.175l-2.721,19.297
                                c0,0-72.469,11.039-80.778,13.566c-9.261,2.815-43.357,8.479-43.357,8.479C62.544,67.365,55.332,77.172,55.332,88.38v21.926h200.66
                                h200.676V88.38C456.668,77.172,449.456,67.365,439.115,64.517z M276.318,38.824h-40.636c-3.606,0-6.532-2.925-6.532-6.532
                                s2.926-6.532,6.532-6.532h40.636c3.606,0,6.532,2.925,6.532,6.532S279.924,38.824,276.318,38.824z" style={{fill: 'rgb(255, 255, 255)'}}></path>
                        </g>
                        </svg>
                    </button>
                </li>
            ));
    };

    return (
        <div className='inner'>
            <section className="mainview">
                <h2 className="chart-title">実費割合</h2>
                {/* <Chart /> */}
            </section>

            <div className="switch">
                <label className="switch-item">
                    <input type="radio" name="switch" defaultChecked />全て
                </label>
                <div>
                    <ul id="all-area" className="display-area">
                        {renderRecords('all')}
                    </ul>
                </div>

                <label className="switch-item">
                    <input type="radio" name="switch" />支出
                </label>
                <div>
                    <ul id="minus-area" className="display-area">
                        {renderRecords('minus')}
                    </ul>
                </div>

                <label className="switch-item">
                    <input type="radio" name="switch" />収入
                </label>
                <div>
                    <ul id="plus-area" className="display-area">
                        {renderRecords('plus')}
                    </ul>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="input-area">
                <div className="question-item">
                    <label className="input">
                        <select id="price-type">
                            <option value="plus">収入</option>
                            <option value="minus">支出</option>
                        </select>
                    </label>
                </div>
                <div className="question-item">
                    <label>
                        <span className="question-title">項目名</span>
                        <input type="text" id="record-title" className="input" required />
                    </label>
                </div>
                <div className="question-item">
                    <label>
                        <span className="question-title">日時</span>
                        <input type="date" id="record-date" className="input" />
                    </label>
                </div>
                <div className="question-item flex">
                    <label>
                        <span className="question-title">金額</span>
                        <input type="number" id="record-price" className="input text-right" placeholder="1000" />
                        <span>&nbsp;円</span>
                    </label>
                </div>
                <div className="question-item flex">
                    <label>
                        <span className="question-title">メモ</span>
                        <input type="text" id="record-notion" className="input" placeholder="お菓子を買った" />
                        <span>&nbsp;円</span>
                    </label>
                </div>
                <button type="submit" className="submit-button">登録</button>
            </form>
        </div>
    );
}
