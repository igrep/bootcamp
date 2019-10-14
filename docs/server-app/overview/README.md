---
footer: CC BY-SA Licensed | Copyright (c) 2019, Internet Initiative Japan Inc.
description: Webアプリケーションを構成する要素の中のサーバサイドの実装技術について簡単に紹介します。
time: 1h
prior_knowledge: 特になし
---

<header-table/>

# サーバアプリ界隈概要

ここでいうサーバアプリとは、Webアプリケーションを構成する要素の中のサーバサイドの実装技術のことをなんとなく表現しています。

## 目次

1. CGI
2. PHP
3. Servlet
4. Java EE / Spring
5. Ruby on Rails
6. Ajaxの出現 / フロントエンド+APIサーバの時代

## CGI

(1993年 フォーマルな仕様制定は1997年)

1. Common Gateway Interface
2. WebサーバでHTTPリクエストを受けて、外部プログラムにHTTPリクエストを渡し、外部プログラムの出力をHTTPレスポンスとして返す仕組み。
3. Perlが大流行するきっかけとなった。
    1. Perlは文字列処理が強力 (C言語は文字列処理が貧弱)
	2. PerlからMySQL/PostgreSQLに接続してHTTPレスポンスを生成するスタイル
4. 今日でもPerlで実装されたプロダクトは存続している(MovableTypeとか、mixiとか。CookPadもPerlでスタートしたはず)。

## PHP

(開発開始は1994年 実質的に最初の公開版PHP3が1997年 本格普及はPHP4で2000年)

1. CGIはHTTPリクエストを受ける毎に、新しいプロセスをforkする必要があり、Webサーバにとって負荷が高かった。
2. Webサーバのモジュールとしてperlを動作させる方法が考案された(mod_perl 1998年)。
    1. しかしPerlはWebサーバのモジュールとして動作させる前提で設計/実装されたものではなく、やや使い勝手が悪かった。
	2. 類似の技術としてFastCGIというものもあり、これは常駐プロセスとしてCGI実行エンジンを用意しておき、HTTPリクエストを常駐プロセスに流し込むという方法。やはり癖があった。
3. 最初からWebサーバのモジュールとして実行することを念頭に置いた、Webプログラミングに特化した処理系としてPHPが登場、大流行してPerlを駆逐する。
   1. Facebookも長い間PHPで書かれていた。

## Servlet

(1996年に初期バージョンが公開 1998年に最初の公式API仕様が確立 2001年にStrutsが登場)

1. 1995年Sun Microsystems社がJava言語を売り出した。最初にアピールしたAppletは、Webページの中にJavaのサンドボックス環境を埋め込んでアプリケーションを実行するというものだったが、制約が大きい上にマシンパワーを要求するので、実用的なアプリケーションを作る環境としては、流行らなかった。
2. しかしサーバサイドの技術として発表されたServletは2000年頃から流行し始め、2001年にStrutsが登場するとその人気は決定的になった。
    1. ServletはHTTPリクエストを(CGIのようにプロセスをforkするのではなく)スレッドで処理するので性能が高かった。
	2. Javaは静的に型付けされた言語であるため、Javaで書かれたアプリケーションはPHPよりも品質を確保しやすいかった。
	3. WebアプリケーションフレームワークであるStrutsを使うと、プログラムを一定のスタイルで記述することを助け、また、大人数で分業することを助けた。規模の大きなエンタープライズシステムの実装が可能になった。
	4. Javaで書かれたコードはポータビリティがあり、サーバのOSやCPUが変わっても、そのまま実行することができた。(まだx86系のCPUが市場を独占しておらず、SPARCやAlphaなどのCPUもある程度のシェアを持っていた。)
3. かくしてカジュアルな(コンシューマ向けの)WebアプリケーションやPHPで書き、シリアスな(エンタープライズ向けの)WebアプリケーションはJava Servletで書く、という時代が続くことになった。

## JavaEE / Spring

(JavaEE 1999年 / Spring 2002年)

1. Sun MicrosystemはServletの成功に気を良くして、これを一層強力に推進してエンタープライズの世界を支配しようと試みた。そうして出てきたのはJavaEE (Enterprise Edition)であった。
2. JavaEEは、エンタープライズアプリケーションを多数のサーバの連携する分散処理を通じて実現することを構想し、その中核技術としてEJB (Enterprise Java Beans)を据えた。EJBを使うと、ネットワーク越しにJavaのオブジェクトが通信し合うことができ、データベースへの永続化も含めてエレガントに処理できるはずだった。Sun Microsystemsの制定したJavaEE仕様を実装するアプリケーションサーバ製品が複数のベンダーから出荷され、活況を呈した。
3. だが、実際のJavaEEアプリケーションサーバ製品は不安定で、性能も悪く、プログラミングも難しいものであった。人々はJavaEEを信じて使い続けていたが、疑問も大きく膨らんでいった。
4. そこに登場したのがSpring Frameworkだった。作者のRod JohnsonがExpertt One-on-One J2EE Design and Developmentとともに世に問うたもので、JavaEE (当時の呼称ではJ2EE) の欠点をハッキリと指摘し、EJB、とりわけEntity Beansを使うことは断念し、POJO (Plain Old Java Object) をベースに開発することを提唱した。また、DI (Dependency Injecttion) のアイデアを普及させ、大規模なJavaアプリケーションを効率よく分業体制で実装する道を切り開いた。
5. Spring Frameworkは一世を風靡しただけでなく、今日まで人気を失なうことなく、利用されている。
   1. StrutsはStrus1の後継バージョンであるStruts2が、Struts1とまったく互換性がなかったため、Struts1を採用していた開発会社に受け入れられず、その後、脆弱性問題を連発したため、今日ではまったく人気がない。

## Ruby on Rails

1. 2004年、37 signales社がbasecampというプロジェクト管理アプリケーションの実装に使用していたRuby on RailsというWebアプリケーションフレームワークを発表した。Railsは非常にインパクトのあるフレームワークで、以降のサーバサイドプログラミングの世界を一変させてしまった。
2. その特徴を列挙すると以下のとおり。
   1. 2つの哲学。「同じことをくりかえさない DRY: Don't repeat yourself」「設定より規約 Convention over Configuration」
	  1. Strutsは、ルーティング(あるURLをどのアクションクラスで処理するかのマッピング)やアクションが処理するリクエストのフォームを記述するクラス、テンプレートの中で使用するタグライブラリの定義など、とにかく多数の設定項目があった。ほとんどの設定項目は、自動的なものであり、設定ファイルのメンテナンスは大量の単純作業であった。
	  2. しかもそれらの設定ファイルは、互いに関連し合うものだったので、記述ミスをして矛盾があると、期待したように動作しなかった。
	  3. そこで、多くの現場では、Excelなどで主要設定項目を管理し、そのExcelファイルからマクロで個々の設定ファイルを生成するようなことが行なわれていた。
	  4. Railsでは、これを「デフォルトで定められているディレクトリ構造や命名規則に沿っているかぎり、設定ファイルは不要とする（特別な場合だけ、設定ファイルを書く）」という方法で解決した。
	  5. たとえば、RDBMSにあるpersonテーブルに対応するモデルクラスをModelsディレクトリにあるPerson.rbファイルに記述すれば、自動的にDBアクセス可能とする、というような具合である。
  2. コマンドラインユーティリティによる開発のサポート
	 1. たとえばあるURLに対応するコントローラクラスのスケルトンをコマンドラインユーティリティから生成することができる。
	 2. このようなユーティリティを提供することで、開発者を単純作業から解放し、価値あるコードを書くことに集中できるようにした。
3. Ruby on Railsに触発されて、他の言語でも同様のフレームワークが多数開発された。
   1. PHP: CakePHP
   2. Java: JBoss Seam, Java EE6, Grails(Groovyを使う), 
   3. Python: Django

## Ajaxの出現 / フロントエンド+APIサーバの時代

1. GoogleマップおよびGMailの出現により「画面遷移を伴わないWebアプリケーション」というものがユーザに認知されるようになった。2005年頃のことである。
2. Googleのエンジニアたちの使った技法は、技術としてはそれ以前から存在していたが誰も注目して来なかったXMLHttpRequestというJavaScriptの機能をはじめて本格的に使用するものだった。
   1. この技法をAsynchronous JavaScript + XMLの頭文字をとってAjax (エイジャックス) と呼ぶようになった。
3. Ajaxが人気を集めるようになると、StrutsやRuby on Railsなどが実現してきた、サーバサイド(バックエンド)側でリクエストを処理して画面も生成するというようなスタイルより、クライアント(フロントエンド)側で画面描画をすべて行ない、バックエンドにはAPIサーバのみを置くというスタイルが人気を集めるようになった。
   1. 画面遷移を伴わないWebアプリケーションのことをSPA (Single Page Application) などと呼ぶ。
   2. このスタイルが定着すると、デスクトップアプリケーションと比較しても遜色ないUIのWebアプリケーションが当り前のように期待されるようになっていった。
   3. 要求の高度化に応えるために、フロントエンド側のフレームワークが非常に速いペースで開発されているのが今日の状況である。今日、もっとも人気のあるフロントエンド・フレームワークとしてReact (Facebook)、Angular (Google)、Vue.js (Evan You)などがある。

## 徳丸本

Webアプリケーションは、われわれの生活に欠かせないものとなっているが、その実装には注意を要する。Webアプリケーションを実装するときには、悪意のユーザによる攻撃を想定しないわけにはいかないのである。

安全なWebアプリケーションを実装するための知識を習得するには「徳丸本」と通称される、「体系的に学ぶ 安全なWebアプリケーションの作り方 第2版」を読むことが *強く* 推奨される。

https://www.sbcr.jp/product/4797393163/

<credit-footer/>