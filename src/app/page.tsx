// import Link from "next/link";
// import Header from "next/link";
// import makeChart from "./makeChart.js";


export default async function HomePage() {

return (
<div className="form inner">
    <div>
        <h2 className="title" data-heading="registran">出金登録</h2>
        <div className="question-item">
            <label className="input">
                <select name="price-type">
                <option value="plus">収入</option>
                <option value="minus">支出</option>
                </select>
            </label>
        </div>
        <div className="question-item">
            <label><span className="question-title">項目名</span><input type="text" name="record-title" className="input" required /></label>
        </div>
        <div className="question-item">
            <input type="date" name="record-date" className="input" />
        </div>
        <div className="question-item flex">
            <input type="number" name="record-price" className="input text-right" placeholder="1000" /><span>&nbsp;円</span>
        </div>
        <div className="question-item flex">
            <label><span className="question-title">メモ</span><input type="number" name="record-notion" className="input text-right" placeholder="1000" /><span>&nbsp;円</span></label>
        </div>
        <button type="submit" className="submit-button">登録</button>
    </div>
</div>
);
}