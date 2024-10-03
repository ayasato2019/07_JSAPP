<?php
// データの取得
$price_type = $_POST['price-type'];
$title = $_POST['title'];
$indate = $_POST['record-date'];
$price = $_POST['record-price'];
$notion = $_POST['record-notion'];

// メールアドレス形式のチェック
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit('不正なメールアドレス形式です。');
}

// tokenの生成
$tokenid = bin2hex(random_bytes(16));

// DB接続
include("./functions.php");
$pdo = db_conn();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// データ登録SQL（最初はemailだけを登録）
$sql = "INSERT INTO gs_an_keisan(id, price_type, title, price, notion, indate) 
        VALUES (:tokenid, :price_type, :title, :price, :notion, :indate )";

// SQLの準備
$stmt = $pdo->prepare($sql);

// バインド変数を使ってデータを保護
$stmt->bindValue(':tokenid', $tokenid, PDO::PARAM_STR);
$stmt->bindValue(':price_type', $email, PDO::PARAM_STR);
$stmt->bindValue(':title', $email, PDO::PARAM_STR);
$stmt->bindValue(':price', $email, PDO::PARAM_STR);
$stmt->bindValue(':indate', $email, PDO::PARAM_STR);
$stmt->bindValue(':notion', $email, PDO::PARAM_STR);

// SQL実行
$status = $stmt->execute();

// SQL実行後の処理
if ($status === false) {
    $error = $stmt->errorInfo();
    exit('データベースエラーが発生しました。');
} else {
    header("Location: ./index.php");
    exit();
}


?>
