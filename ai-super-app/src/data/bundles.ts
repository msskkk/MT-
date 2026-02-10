import { Bundle } from "./types";

export const bundles: Bundle[] = [
  {
    id:"daily",emoji:"☀️",gradient:"from-orange-400 to-amber-500",bgLight:"bg-orange-50",
    tools:[
      {id:"wardrobe",nameKey:"tools.daily.wardrobe",emoji:"👔",type:"image-upload",
        inputLabelKey:"tools.daily.wardrobe_input",outputLabelKey:"tools.daily.wardrobe_output",
        aiPrompt:"あなたはファッションコーディネーターです。クローゼットの写真を分析し、今日の天気と気温を考慮したおすすめコーデを提案してください。"},
      {id:"calorie",nameKey:"tools.daily.calorie",emoji:"🍽️",type:"image-upload",
        inputLabelKey:"tools.daily.calorie_input",outputLabelKey:"tools.daily.calorie_output",
        aiPrompt:"あなたは管理栄養士です。食事の写真からカロリー、主要栄養素(タンパク質・脂質・炭水化物)を推定し、健康アドバイスを提供してください。"},
      {id:"recipe",nameKey:"tools.daily.recipe",emoji:"🍳",type:"image-upload",
        inputLabelKey:"tools.daily.recipe_input",outputLabelKey:"tools.daily.recipe_output",
        aiPrompt:"あなたは料理研究家です。冷蔵庫の写真から使える食材を特定し、簡単に作れるレシピを3つ提案してください。調理時間と難易度も記載してください。"}
    ]
  },
  {
    id:"creator",emoji:"🎬",gradient:"from-purple-500 to-indigo-600",bgLight:"bg-purple-50",
    tools:[
      {id:"thumbnail",nameKey:"tools.creator.thumbnail",emoji:"🖼️",type:"text-input",
        inputLabelKey:"tools.creator.thumbnail_input",outputLabelKey:"tools.creator.thumbnail_output",
        placeholder:"例: 【衝撃】プログラマーが1ヶ月で月収100万円達成した方法",
        aiPrompt:"あなたはYouTubeサムネイルデザイナーです。動画タイトルから、クリック率の高いサムネイルの構図・色使い・テキスト配置を提案してください。"},
      {id:"voice",nameKey:"tools.creator.voice",emoji:"🎙️",type:"text-input",
        inputLabelKey:"tools.creator.voice_input",outputLabelKey:"tools.creator.voice_output",
        placeholder:"例: 今日はReactの新機能について解説します",
        aiPrompt:"あなたはナレーションディレクターです。テキストを自然な話し言葉に変換し、強調ポイントや間の取り方を指示してください。"},
      {id:"pitch",nameKey:"tools.creator.pitch",emoji:"📊",type:"text-input",
        inputLabelKey:"tools.creator.pitch_input",outputLabelKey:"tools.creator.pitch_output",
        placeholder:"例: AIを活用した個人向け栄養管理アプリの提案",
        aiPrompt:"あなたはプレゼンテーションデザイナーです。テーマからスライドの構成(タイトル・各スライドの見出しと要点)を提案してください。5〜8枚程度で。"}
    ]
  },
  {
    id:"sidehustle",emoji:"💼",gradient:"from-green-500 to-emerald-600",bgLight:"bg-green-50",
    tools:[
      {id:"listing",nameKey:"tools.sidehustle.listing",emoji:"🏷️",type:"image-upload",
        inputLabelKey:"tools.sidehustle.listing_input",outputLabelKey:"tools.sidehustle.listing_output",
        aiPrompt:"あなたはフリマアプリの出品エキスパートです。商品写真から魅力的な出品タイトルと説明文を生成してください。適正価格も提案してください。"},
      {id:"invoice",nameKey:"tools.sidehustle.invoice",emoji:"💴",type:"form-input",
        inputLabelKey:"tools.sidehustle.invoice_input",outputLabelKey:"tools.sidehustle.invoice_output",
        fields:[{name:"クライアント名",placeholder:"例: 株式会社ABC"},{name:"金額",placeholder:"例: 50,000円"},{name:"内容",placeholder:"例: Webサイトデザイン"}],
        aiPrompt:"あなたは経理のプロです。入力情報から請求書のフォーマットを生成してください。振込先や支払期限の注意点も記載してください。"},
      {id:"contract",nameKey:"tools.sidehustle.contract",emoji:"⚖️",type:"file-upload",
        inputLabelKey:"tools.sidehustle.contract_input",outputLabelKey:"tools.sidehustle.contract_output",
        aiPrompt:"あなたは契約書レビューの専門家です。契約書の内容を分析し、リスクのある条項や修正すべきポイントを指摘してください。"}
    ]
  },
  {
    id:"beauty",emoji:"💄",gradient:"from-pink-400 to-rose-500",bgLight:"bg-pink-50",
    tools:[
      {id:"skin",nameKey:"tools.beauty.skin",emoji:"✨",type:"image-upload",
        inputLabelKey:"tools.beauty.skin_input",outputLabelKey:"tools.beauty.skin_output",
        aiPrompt:"あなたは皮膚科の美容アドバイザーです。肌の状態を分析し、スキンケアルーティンとおすすめ成分を提案してください。"},
      {id:"outfit",nameKey:"tools.beauty.outfit",emoji:"👔",type:"image-upload",
        inputLabelKey:"tools.beauty.outfit_input",outputLabelKey:"tools.beauty.outfit_output",
        aiPrompt:"あなたはパーソナルスタイリストです。全身写真から体型・肌色に合うコーディネートを提案してください。"},
      {id:"headshot",nameKey:"tools.beauty.headshot",emoji:"👤",type:"image-upload",
        inputLabelKey:"tools.beauty.headshot_input",outputLabelKey:"tools.beauty.headshot_output",
        aiPrompt:"あなたはプロフィール写真のフォトグラファーです。自撮り写真を分析し、よりプロフェッショナルに見えるアングル・照明・表情のアドバイスをしてください。"}
    ]
  },
  {
    id:"parent",emoji:"👨‍👩‍👧‍👦",gradient:"from-sky-400 to-blue-500",bgLight:"bg-sky-50",
    tools:[
      {id:"babyname",nameKey:"tools.parent.babyname",emoji:"👶",type:"form-input",
        inputLabelKey:"tools.parent.babyname_input",outputLabelKey:"tools.parent.babyname_output",
        fields:[{name:"姓",placeholder:"例: 田中"},{name:"希望する響き",placeholder:"例: 明るい、和風"},{name:"文字数",placeholder:"例: 2文字"}],
        aiPrompt:"あなたは命名の専門家です。姓との相性、画数、意味を考慮した名前を5つ提案してください。それぞれの由来と画数も記載してください。"},
      {id:"plant",nameKey:"tools.parent.plant",emoji:"🌿",type:"image-upload",
        inputLabelKey:"tools.parent.plant_input",outputLabelKey:"tools.parent.plant_output",
        aiPrompt:"あなたは植物の専門家です。植物の写真から種類を特定し、育て方のアドバイス(水やり頻度、日当たり、肥料)を提供してください。"},
      {id:"receipt",nameKey:"tools.parent.receipt",emoji:"🧾",type:"image-upload",
        inputLabelKey:"tools.parent.receipt_input",outputLabelKey:"tools.parent.receipt_output",
        aiPrompt:"あなたは家計管理のプロです。レシートの写真から金額とカテゴリを読み取り、月の支出傾向と節約アドバイスを提供してください。"}
    ]
  },
  {
    id:"student",emoji:"🎓",gradient:"from-indigo-500 to-blue-600",bgLight:"bg-indigo-50",
    tools:[
      {id:"study",nameKey:"tools.student.study",emoji:"📚",type:"image-upload",
        inputLabelKey:"tools.student.study_input",outputLabelKey:"tools.student.study_output",
        aiPrompt:"あなたは教育の専門家です。教科書やノートの写真から重要なポイントを抽出し、理解度チェック用の問題を5問作成してください。"},
      {id:"tone",nameKey:"tools.student.tone",emoji:"✏️",type:"text-input",
        inputLabelKey:"tools.student.tone_input",outputLabelKey:"tools.student.tone_output",
        placeholder:"例: 本研究では、機械学習アルゴリズムの性能評価を実施した。",
        aiPrompt:"あなたは文章のプロです。入力された文章のトーンを変換してください(カジュアル↔フォーマル、敬語↔タメ口など)。変換前後の違いのポイントも説明してください。"},
      {id:"resume",nameKey:"tools.student.resume",emoji:"📄",type:"file-upload",
        inputLabelKey:"tools.student.resume_input",outputLabelKey:"tools.student.resume_output",
        aiPrompt:"あなたはキャリアアドバイザーです。履歴書を分析し、改善ポイント、強調すべきスキル、面接対策のアドバイスを提供してください。"}
    ]
  },
  {
    id:"health",emoji:"💪",gradient:"from-red-400 to-rose-500",bgLight:"bg-red-50",
    tools:[
      {id:"symptom",nameKey:"tools.health.symptom",emoji:"🩺",type:"form-input",
        inputLabelKey:"tools.health.symptom_input",outputLabelKey:"tools.health.symptom_output",
        fields:[{name:"症状",placeholder:"例: 頭痛、倦怠感"},{name:"期間",placeholder:"例: 3日前から"},{name:"年齢・性別",placeholder:"例: 30代男性"}],
        aiPrompt:"あなたは健康アドバイザーです(医師ではありません)。症状から考えられる原因と、セルフケアのアドバイスを提供してください。必ず「医師への相談を推奨」と記載してください。"},
      {id:"run",nameKey:"tools.health.run",emoji:"🏃",type:"form-input",
        inputLabelKey:"tools.health.run_input",outputLabelKey:"tools.health.run_output",
        fields:[{name:"場所",placeholder:"例: 渋谷区周辺"},{name:"距離",placeholder:"例: 5km"},{name:"レベル",placeholder:"例: 初心者"}],
        aiPrompt:"あなたはランニングコーチです。条件に合ったランニングルートを提案してください。距離、高低差、おすすめポイント、注意事項を記載してください。"},
      {id:"meal",nameKey:"tools.health.meal",emoji:"🥗",type:"form-input",
        inputLabelKey:"tools.health.meal_input",outputLabelKey:"tools.health.meal_output",
        fields:[{name:"目的",placeholder:"例: ダイエット、筋肉増量"},{name:"制限",placeholder:"例: 乳製品NG"},{name:"予算",placeholder:"例: 1日1500円以内"}],
        aiPrompt:"あなたは管理栄養士です。目的と制限に合った1日の食事プランを提案してください。カロリーとPFCバランスも記載してください。"}
    ]
  },
  {
    id:"design",emoji:"🎯",gradient:"from-violet-500 to-purple-600",bgLight:"bg-violet-50",
    tools:[
      {id:"logo",nameKey:"tools.design.logo",emoji:"🎨",type:"form-input",
        inputLabelKey:"tools.design.logo_input",outputLabelKey:"tools.design.logo_output",
        fields:[{name:"ブランド名",placeholder:"例: TechFlow"},{name:"業種",placeholder:"例: ITスタートアップ"},{name:"イメージ",placeholder:"例: モダン、信頼感"}],
        aiPrompt:"あなたはロゴデザイナーです。ブランド情報からロゴのコンセプト、形状、配色、フォントの提案をしてください。3パターン提案してください。"},
      {id:"color",nameKey:"tools.design.color",emoji:"🌈",type:"image-upload",
        inputLabelKey:"tools.design.color_input",outputLabelKey:"tools.design.color_output",
        aiPrompt:"あなたはカラーコンサルタントです。画像から色を抽出し、調和のとれたカラーパレットを提案してください。HEXコードも記載してください。"},
      {id:"mockup",nameKey:"tools.design.mockup",emoji:"📱",type:"form-input",
        inputLabelKey:"tools.design.mockup_input",outputLabelKey:"tools.design.mockup_output",
        fields:[{name:"プロダクト",placeholder:"例: モバイルアプリ"},{name:"画面",placeholder:"例: ログイン画面"},{name:"スタイル",placeholder:"例: ミニマル"}],
        aiPrompt:"あなたはUIデザイナーです。プロダクト情報からUI/UXのモックアップ構成を提案してください。レイアウト、要素配置、インタラクションを記載してください。"}
    ]
  },
  {
    id:"realestate",emoji:"🏠",gradient:"from-amber-500 to-orange-600",bgLight:"bg-amber-50",
    tools:[
      {id:"floor",nameKey:"tools.realestate.floor",emoji:"🛋️",type:"image-upload",
        inputLabelKey:"tools.realestate.floor_input",outputLabelKey:"tools.realestate.floor_output",
        aiPrompt:"あなたはインテリアコーディネーターです。部屋の写真から最適な家具配置と内装のアドバイスを提供してください。"},
      {id:"value",nameKey:"tools.realestate.value",emoji:"💰",type:"form-input",
        inputLabelKey:"tools.realestate.value_input",outputLabelKey:"tools.realestate.value_output",
        fields:[{name:"所在地",placeholder:"例: 東京都渋谷区"},{name:"広さ",placeholder:"例: 65㎡ 2LDK"},{name:"築年数",placeholder:"例: 15年"}],
        aiPrompt:"あなたは不動産鑑定士です。物件情報から推定価格帯と、資産価値に影響する要因を分析してください。"},
      {id:"checklist",nameKey:"tools.realestate.checklist",emoji:"📋",type:"form-input",
        inputLabelKey:"tools.realestate.checklist_input",outputLabelKey:"tools.realestate.checklist_output",
        fields:[{name:"物件タイプ",placeholder:"例: 中古マンション"},{name:"家族構成",placeholder:"例: 夫婦+子供1人"},{name:"重視ポイント",placeholder:"例: 通勤、子育て環境"}],
        aiPrompt:"あなたは不動産コンサルタントです。内見時にチェックすべきポイントを網羅的にリストアップしてください。"}
    ]
  },
  {
    id:"sns",emoji:"📱",gradient:"from-blue-500 to-cyan-500",bgLight:"bg-blue-50",
    tools:[
      {id:"caption",nameKey:"tools.sns.caption",emoji:"✍️",type:"text-input",
        inputLabelKey:"tools.sns.caption_input",outputLabelKey:"tools.sns.caption_output",
        placeholder:"例: 新しいカフェを見つけた。ラテアートが最高。",
        aiPrompt:"あなたはSNSマーケティングのプロです。投稿内容からInstagram/Twitter/TikTok向けのバズるキャプションを3パターン生成してください。"},
      {id:"hashtag",nameKey:"tools.sns.hashtag",emoji:"#️⃣",type:"text-input",
        inputLabelKey:"tools.sns.hashtag_input",outputLabelKey:"tools.sns.hashtag_output",
        placeholder:"例: 東京 カフェ巡り スイーツ",
        aiPrompt:"あなたはSNSハッシュタグ戦略の専門家です。キーワードから最適なハッシュタグセット(人気タグ+ニッチタグ)を提案してください。"},
      {id:"bg",nameKey:"tools.sns.bg",emoji:"🖼️",type:"image-upload",
        inputLabelKey:"tools.sns.bg_input",outputLabelKey:"tools.sns.bg_output",
        aiPrompt:"あなたは商品写真の編集エキスパートです。商品写真の背景除去・差し替えのアドバイスと、魅力的な撮影アングルを提案してください。"}
    ]
  },
  {
    id:"money",emoji:"💰",gradient:"from-yellow-500 to-amber-600",bgLight:"bg-yellow-50",
    tools:[
      {id:"budget",nameKey:"tools.money.budget",emoji:"📊",type:"form-input",
        inputLabelKey:"tools.money.budget_input",outputLabelKey:"tools.money.budget_output",
        fields:[{name:"月収",placeholder:"例: 30万円"},{name:"固定費",placeholder:"例: 家賃8万、光熱費1.5万"},{name:"貯金目標",placeholder:"例: 月5万円"}],
        aiPrompt:"あなたはファイナンシャルプランナーです。収支情報から最適な予算配分と節約ポイントを提案してください。"},
      {id:"tax",nameKey:"tools.money.tax",emoji:"🏛️",type:"form-input",
        inputLabelKey:"tools.money.tax_input",outputLabelKey:"tools.money.tax_output",
        fields:[{name:"年収",placeholder:"例: 500万円"},{name:"副業収入",placeholder:"例: 月5万円"},{name:"控除",placeholder:"例: ふるさと納税、医療費"}],
        aiPrompt:"あなたは税理士です。収入情報から確定申告のポイントと節税対策を提案してください。一般的なアドバイスであり税務相談ではない旨を記載してください。"},
      {id:"saving",nameKey:"tools.money.saving",emoji:"🐷",type:"form-input",
        inputLabelKey:"tools.money.saving_input",outputLabelKey:"tools.money.saving_output",
        fields:[{name:"目標金額",placeholder:"例: 100万円"},{name:"期間",placeholder:"例: 1年"},{name:"月の余裕額",placeholder:"例: 5万円"}],
        aiPrompt:"あなたは貯蓄アドバイザーです。目標から逆算した具体的な貯蓄プランを提案してください。自動積立の設定方法も記載してください。"}
    ]
  },
  {
    id:"pet",emoji:"🐾",gradient:"from-orange-400 to-red-400",bgLight:"bg-orange-50",
    tools:[
      {id:"petphoto",nameKey:"tools.pet.petphoto",emoji:"📸",type:"image-upload",
        inputLabelKey:"tools.pet.petphoto_input",outputLabelKey:"tools.pet.petphoto_output",
        aiPrompt:"あなたはペット写真の専門家です。ペット写真をよりかわいく撮るためのアングル、照明、ポーズのアドバイスを提供してください。"},
      {id:"petfood",nameKey:"tools.pet.petfood",emoji:"🦴",type:"form-input",
        inputLabelKey:"tools.pet.petfood_input",outputLabelKey:"tools.pet.petfood_output",
        fields:[{name:"ペットの種類",placeholder:"例: 柴犬"},{name:"年齢・体重",placeholder:"例: 3歳 10kg"},{name:"健康状態",placeholder:"例: 特になし"}],
        aiPrompt:"あなたはペット栄養士です。ペットの情報から最適な食事プランとおすすめフードを提案してください。"},
      {id:"petsymptom",nameKey:"tools.pet.petsymptom",emoji:"🏥",type:"text-input",
        inputLabelKey:"tools.pet.petsymptom_input",outputLabelKey:"tools.pet.petsymptom_output",
        placeholder:"例: 最近食欲がなく、元気がない。水は飲んでいる。",
        aiPrompt:"あなたはペットの健康アドバイザーです。症状から考えられる原因と対処法を提案してください。必ず「獣医への相談を推奨」と記載してください。"}
    ]
  },
  {
    id:"travel",emoji:"✈️",gradient:"from-cyan-500 to-blue-600",bgLight:"bg-cyan-50",
    tools:[
      {id:"plan",nameKey:"tools.travel.plan",emoji:"🗺️",type:"form-input",
        inputLabelKey:"tools.travel.plan_input",outputLabelKey:"tools.travel.plan_output",
        fields:[{name:"目的地",placeholder:"例: バルセロナ"},{name:"期間",placeholder:"例: 4泊5日"},{name:"予算",placeholder:"例: 30万円"},{name:"興味",placeholder:"例: 建築、グルメ"}],
        aiPrompt:"あなたは旅行プランナーです。条件に合った日ごとの旅行プランを作成してください。移動手段、所要時間、おすすめスポットを記載してください。"},
      {id:"pack",nameKey:"tools.travel.pack",emoji:"🧳",type:"form-input",
        inputLabelKey:"tools.travel.pack_input",outputLabelKey:"tools.travel.pack_output",
        fields:[{name:"目的地",placeholder:"例: ハワイ"},{name:"期間",placeholder:"例: 5日間"},{name:"季節",placeholder:"例: 夏"}],
        aiPrompt:"あなたは旅行準備の専門家です。目的地と期間に合った持ち物リストを作成してください。必需品と便利グッズに分けてください。"},
      {id:"phrase",nameKey:"tools.travel.phrase",emoji:"💬",type:"form-input",
        inputLabelKey:"tools.travel.phrase_input",outputLabelKey:"tools.travel.phrase_output",
        fields:[{name:"言語",placeholder:"例: スペイン語"},{name:"場面",placeholder:"例: レストラン、ホテル、買い物"}],
        aiPrompt:"あなたは語学コーチです。旅行で使える実践的なフレーズを場面別に10個ずつ提案してください。発音ガイドも記載してください。"}
    ]
  },
  {
    id:"writer",emoji:"📝",gradient:"from-gray-600 to-gray-800",bgLight:"bg-gray-50",
    tools:[
      {id:"blog",nameKey:"tools.writer.blog",emoji:"📰",type:"text-input",
        inputLabelKey:"tools.writer.blog_input",outputLabelKey:"tools.writer.blog_output",
        placeholder:"例: リモートワークで生産性を上げる5つの方法",
        aiPrompt:"あなたはプロのブログライターです。テーマから読みやすいブログ記事の構成(見出し、導入、各セクションの要点)を提案してください。"},
      {id:"mail",nameKey:"tools.writer.mail",emoji:"📧",type:"text-input",
        inputLabelKey:"tools.writer.mail_input",outputLabelKey:"tools.writer.mail_output",
        placeholder:"例: 納期延長のお願い。理由は資材の遅延。1週間の延長を希望。",
        aiPrompt:"あなたはビジネスメールの専門家です。要点からプロフェッショナルなメールを作成してください。敬語・ビジネスマナーを守ってください。"},
      {id:"proofread",nameKey:"tools.writer.proofread",emoji:"🔍",type:"text-input",
        inputLabelKey:"tools.writer.proofread_input",outputLabelKey:"tools.writer.proofread_output",
        placeholder:"文章を貼り付けてください",
        aiPrompt:"あなたはプロの校正者です。文章の誤字脱字、文法ミス、表現の改善点を指摘してください。修正案も提示してください。"}
    ]
  },
  {
    id:"diy",emoji:"🔨",gradient:"from-yellow-600 to-orange-600",bgLight:"bg-yellow-50",
    tools:[
      {id:"plan",nameKey:"tools.diy.plan",emoji:"📐",type:"image-upload",
        inputLabelKey:"tools.diy.plan_input",outputLabelKey:"tools.diy.plan_output",
        aiPrompt:"あなたはDIYアドバイザーです。写真から改修・制作プランを提案してください。必要な工具・材料・手順を記載してください。"},
      {id:"cost",nameKey:"tools.diy.cost",emoji:"💰",type:"form-input",
        inputLabelKey:"tools.diy.cost_input",outputLabelKey:"tools.diy.cost_output",
        fields:[{name:"プロジェクト",placeholder:"例: 本棚を作る"},{name:"サイズ",placeholder:"例: 幅80cm×高さ180cm"},{name:"素材",placeholder:"例: パイン材"}],
        aiPrompt:"あなたはDIYコストの専門家です。プロジェクトの材料費・工具費を見積もってください。ホームセンターでの購入先も提案してください。"},
      {id:"fix",nameKey:"tools.diy.fix",emoji:"🔧",type:"image-upload",
        inputLabelKey:"tools.diy.fix_input",outputLabelKey:"tools.diy.fix_output",
        aiPrompt:"あなたは修理の専門家です。壊れた箇所の写真から修理方法をステップバイステップで説明してください。必要な道具と難易度も記載してください。"}
    ]
  },
  {
    id:"music",emoji:"🎵",gradient:"from-pink-500 to-purple-600",bgLight:"bg-pink-50",
    tools:[
      {id:"chord",nameKey:"tools.music.chord",emoji:"🎸",type:"form-input",
        inputLabelKey:"tools.music.chord_input",outputLabelKey:"tools.music.chord_output",
        fields:[{name:"ジャンル",placeholder:"例: J-Pop、ボサノバ"},{name:"雰囲気",placeholder:"例: 切ない、爽やか"},{name:"キー",placeholder:"例: Cメジャー"}],
        aiPrompt:"あなたは作曲家です。条件に合ったコード進行を3パターン提案してください。各コードの機能と雰囲気の説明も記載してください。"},
      {id:"lyric",nameKey:"tools.music.lyric",emoji:"🎤",type:"text-input",
        inputLabelKey:"tools.music.lyric_input",outputLabelKey:"tools.music.lyric_output",
        placeholder:"例: 夏の終わり、片思いの思い出",
        aiPrompt:"あなたは作詞家です。テーマからAメロ・Bメロ・サビの歌詞を作成してください。韻を踏んだり、印象的なフレーズを入れてください。"},
      {id:"mix",nameKey:"tools.music.mix",emoji:"🎛️",type:"text-input",
        inputLabelKey:"tools.music.mix_input",outputLabelKey:"tools.music.mix_output",
        placeholder:"例: ボーカル+アコギ+ドラムの3トラック。ボーカルが埋もれる。",
        aiPrompt:"あなたはミキシングエンジニアです。トラック構成の問題を分析し、EQ、コンプ、パンニングのアドバイスを提供してください。"}
    ]
  },
  {
    id:"game",emoji:"🎮",gradient:"from-green-500 to-teal-600",bgLight:"bg-green-50",
    tools:[
      {id:"idea",nameKey:"tools.game.idea",emoji:"💡",type:"form-input",
        inputLabelKey:"tools.game.idea_input",outputLabelKey:"tools.game.idea_output",
        fields:[{name:"ジャンル",placeholder:"例: ローグライク、パズル"},{name:"プラットフォーム",placeholder:"例: スマホ"},{name:"ターゲット",placeholder:"例: カジュアルゲーマー"}],
        aiPrompt:"あなたはゲームデザイナーです。条件に合ったゲームのコンセプトを提案してください。コアメカニクス、ユニークポイント、マネタイズを記載してください。"},
      {id:"story",nameKey:"tools.game.story",emoji:"📖",type:"text-input",
        inputLabelKey:"tools.game.story_input",outputLabelKey:"tools.game.story_output",
        placeholder:"例: ポスト・アポカリプスの世界。主人公は記憶喪失のロボット。",
        aiPrompt:"あなたはゲームシナリオライターです。世界観設定からメインストーリーの概要、キャラクター設定、重要なプロットポイントを提案してください。"},
      {id:"balance",nameKey:"tools.game.balance",emoji:"⚖️",type:"text-input",
        inputLabelKey:"tools.game.balance_input",outputLabelKey:"tools.game.balance_output",
        placeholder:"例: 戦士クラスが強すぎて魔法使いが使われない。戦士HP100攻撃30、魔法使いHP60攻撃20+魔法。",
        aiPrompt:"あなたはゲームバランスの専門家です。パラメータを分析し、バランス改善の提案をしてください。数値の根拠も説明してください。"}
    ]
  },
  {
    id:"cook",emoji:"👨‍🍳",gradient:"from-red-500 to-orange-500",bgLight:"bg-red-50",
    tools:[
      {id:"arrange",nameKey:"tools.cook.arrange",emoji:"✨",type:"image-upload",
        inputLabelKey:"tools.cook.arrange_input",outputLabelKey:"tools.cook.arrange_output",
        aiPrompt:"あなたは料理研究家です。料理の写真から盛り付けの改善点と、味のアレンジ提案をしてください。"},
      {id:"menu",nameKey:"tools.cook.menu",emoji:"📋",type:"form-input",
        inputLabelKey:"tools.cook.menu_input",outputLabelKey:"tools.cook.menu_output",
        fields:[{name:"人数",placeholder:"例: 4人家族"},{name:"制限",placeholder:"例: 子供あり、アレルギーなし"},{name:"予算",placeholder:"例: 週5000円"}],
        aiPrompt:"あなたは献立アドバイザーです。条件に合った1週間の献立を作成してください。買い物リストも付けてください。"},
      {id:"pairing",nameKey:"tools.cook.pairing",emoji:"🍷",type:"text-input",
        inputLabelKey:"tools.cook.pairing_input",outputLabelKey:"tools.cook.pairing_output",
        placeholder:"例: 鶏の唐揚げ",
        aiPrompt:"あなたはフードペアリングの専門家です。メイン料理に合う副菜、ドリンク、デザートを提案してください。"}
    ]
  },
  {
    id:"fitness",emoji:"🏋️",gradient:"from-orange-500 to-red-600",bgLight:"bg-orange-50",
    tools:[
      {id:"form",nameKey:"tools.fitness.form",emoji:"📷",type:"image-upload",
        inputLabelKey:"tools.fitness.form_input",outputLabelKey:"tools.fitness.form_output",
        aiPrompt:"あなたはパーソナルトレーナーです。トレーニングフォームの写真を分析し、改善ポイントとケガ予防のアドバイスを提供してください。"},
      {id:"program",nameKey:"tools.fitness.program",emoji:"📋",type:"form-input",
        inputLabelKey:"tools.fitness.program_input",outputLabelKey:"tools.fitness.program_output",
        fields:[{name:"目標",placeholder:"例: 筋肉増量、体脂肪15%以下"},{name:"頻度",placeholder:"例: 週3回"},{name:"器具",placeholder:"例: ダンベルのみ"}],
        aiPrompt:"あなたはパーソナルトレーナーです。目標に合った週間トレーニングプログラムを作成してください。セット数・レップ数・休憩時間も記載してください。"},
      {id:"stretch",nameKey:"tools.fitness.stretch",emoji:"🧘",type:"form-input",
        inputLabelKey:"tools.fitness.stretch_input",outputLabelKey:"tools.fitness.stretch_output",
        fields:[{name:"気になる部位",placeholder:"例: 肩、腰"},{name:"生活スタイル",placeholder:"例: デスクワーク8時間"}],
        aiPrompt:"あなたはストレッチの専門家です。体の状態に合った10分間のストレッチメニューを作成してください。各ストレッチの時間と回数も記載してください。"}
    ]
  },
  {
    id:"photo",emoji:"📸",gradient:"from-gray-700 to-gray-900",bgLight:"bg-gray-50",
    tools:[
      {id:"enhance",nameKey:"tools.photo.enhance",emoji:"✨",type:"image-upload",
        inputLabelKey:"tools.photo.enhance_input",outputLabelKey:"tools.photo.enhance_output",
        aiPrompt:"あなたはプロの写真家です。写真の改善ポイント(露出、ホワイトバランス、彩度、シャープネス)を分析し、具体的な編集パラメータを提案してください。"},
      {id:"comp",nameKey:"tools.photo.comp",emoji:"📐",type:"image-upload",
        inputLabelKey:"tools.photo.comp_input",outputLabelKey:"tools.photo.comp_output",
        aiPrompt:"あなたは写真構図の専門家です。写真の構図を分析し、三分割法・対角線構図などの観点から改善点を提案してください。"},
      {id:"edit",nameKey:"tools.photo.edit",emoji:"🎨",type:"image-upload",
        inputLabelKey:"tools.photo.edit_input",outputLabelKey:"tools.photo.edit_output",
        aiPrompt:"あなたはLightroom/Photoshopのエキスパートです。写真に最適な編集ワークフローをステップバイステップで提案してください。"}
    ]
  },
  {
    id:"legal",emoji:"⚖️",gradient:"from-slate-600 to-slate-800",bgLight:"bg-slate-50",
    tools:[
      {id:"check",nameKey:"tools.legal.check",emoji:"📋",type:"file-upload",
        inputLabelKey:"tools.legal.check_input",outputLabelKey:"tools.legal.check_output",
        aiPrompt:"あなたは契約書レビューの専門家です。契約書のリスク条項、不利な条件、欠落条項を指摘してください。法的助言ではなく一般的な情報提供である旨を記載してください。"},
      {id:"consult",nameKey:"tools.legal.consult",emoji:"💬",type:"text-input",
        inputLabelKey:"tools.legal.consult_input",outputLabelKey:"tools.legal.consult_output",
        placeholder:"例: 退職時に有給休暇を消化させてもらえない。どうすればいい？",
        aiPrompt:"あなたは法律の一般的な情報提供者です。法律問題について一般的な知識を共有してください。必ず「弁護士への相談を推奨」と記載してください。"},
      {id:"letter",nameKey:"tools.legal.letter",emoji:"📝",type:"text-input",
        inputLabelKey:"tools.legal.letter_input",outputLabelKey:"tools.legal.letter_output",
        placeholder:"例: 隣人の騒音に対する改善要望の手紙",
        aiPrompt:"あなたは文書作成の専門家です。要点から丁寧で効果的な書面を作成してください。法的効力についての注意事項も記載してください。"}
    ]
  },
  {
    id:"learn",emoji:"📖",gradient:"from-emerald-500 to-green-600",bgLight:"bg-emerald-50",
    tools:[
      {id:"explain",nameKey:"tools.learn.explain",emoji:"💡",type:"text-input",
        inputLabelKey:"tools.learn.explain_input",outputLabelKey:"tools.learn.explain_output",
        placeholder:"例: 量子コンピュータの仕組みを中学生にもわかるように",
        aiPrompt:"あなたは優秀な家庭教師です。難しい概念を身近な例えを使ってわかりやすく説明してください。段階的に理解が深まるよう構成してください。"},
      {id:"quiz",nameKey:"tools.learn.quiz",emoji:"❓",type:"form-input",
        inputLabelKey:"tools.learn.quiz_input",outputLabelKey:"tools.learn.quiz_output",
        fields:[{name:"科目",placeholder:"例: 日本史、Python"},{name:"範囲",placeholder:"例: 江戸時代、リスト操作"},{name:"難易度",placeholder:"例: 中級"}],
        aiPrompt:"あなたはテスト作成の専門家です。条件に合った確認テスト(5問)を作成してください。選択肢式と記述式を混ぜてください。解答と解説も付けてください。"},
      {id:"roadmap",nameKey:"tools.learn.roadmap",emoji:"🗺️",type:"form-input",
        inputLabelKey:"tools.learn.roadmap_input",outputLabelKey:"tools.learn.roadmap_output",
        fields:[{name:"学びたいこと",placeholder:"例: Webエンジニアになる"},{name:"現在のレベル",placeholder:"例: HTML/CSSは少し"},{name:"期間",placeholder:"例: 6ヶ月"}],
        aiPrompt:"あなたは学習コーチです。目標達成のための段階的な学習ロードマップを作成してください。週ごとのマイルストーンとおすすめリソースを記載してください。"}
    ]
  },
  {
    id:"wedding",emoji:"💒",gradient:"from-rose-400 to-pink-500",bgLight:"bg-rose-50",
    tools:[
      {id:"plan",nameKey:"tools.wedding.plan",emoji:"📋",type:"form-input",
        inputLabelKey:"tools.wedding.plan_input",outputLabelKey:"tools.wedding.plan_output",
        fields:[{name:"時期",placeholder:"例: 来年6月"},{name:"人数",placeholder:"例: 80人"},{name:"予算",placeholder:"例: 300万円"},{name:"スタイル",placeholder:"例: ガーデンウェディング"}],
        aiPrompt:"あなたはウェディングプランナーです。条件に合った結婚式の全体プランを提案してください。タイムライン、会場選び、演出のアイデアを記載してください。"},
      {id:"speech",nameKey:"tools.wedding.speech",emoji:"🎤",type:"form-input",
        inputLabelKey:"tools.wedding.speech_input",outputLabelKey:"tools.wedding.speech_output",
        fields:[{name:"関係",placeholder:"例: 新郎の友人"},{name:"エピソード",placeholder:"例: 大学のサークルで出会った"},{name:"長さ",placeholder:"例: 3分程度"}],
        aiPrompt:"あなたはスピーチライターです。結婚式のスピーチを作成してください。温かみがあり、会場が笑顔になるような内容にしてください。"},
      {id:"budget",nameKey:"tools.wedding.budget",emoji:"💰",type:"form-input",
        inputLabelKey:"tools.wedding.budget_input",outputLabelKey:"tools.wedding.budget_output",
        fields:[{name:"総予算",placeholder:"例: 300万円"},{name:"人数",placeholder:"例: 80人"},{name:"こだわり",placeholder:"例: 料理、ドレス"}],
        aiPrompt:"あなたはウェディングの予算管理の専門家です。総予算から各項目の適切な配分を提案してください。節約ポイントも記載してください。"}
    ]
  },
  {
    id:"moving",emoji:"🚚",gradient:"from-blue-500 to-indigo-600",bgLight:"bg-blue-50",
    tools:[
      {id:"checklist",nameKey:"tools.moving.checklist",emoji:"✅",type:"form-input",
        inputLabelKey:"tools.moving.checklist_input",outputLabelKey:"tools.moving.checklist_output",
        fields:[{name:"引越し日",placeholder:"例: 3月15日"},{name:"現住所→新住所",placeholder:"例: 東京→大阪"},{name:"家族構成",placeholder:"例: 一人暮らし"}],
        aiPrompt:"あなたは引越しアドバイザーです。引越し日から逆算した準備チェックリストを作成してください。手続き、片付け、当日の動きを時系列で記載してください。"},
      {id:"cost",nameKey:"tools.moving.cost",emoji:"💰",type:"form-input",
        inputLabelKey:"tools.moving.cost_input",outputLabelKey:"tools.moving.cost_output",
        fields:[{name:"距離",placeholder:"例: 東京→大阪"},{name:"荷物量",placeholder:"例: 1LDK分"},{name:"時期",placeholder:"例: 3月"}],
        aiPrompt:"あなたは引越し費用の専門家です。条件から引越し費用の相場を見積もってください。節約のコツも記載してください。"},
      {id:"layout",nameKey:"tools.moving.layout",emoji:"🏠",type:"image-upload",
        inputLabelKey:"tools.moving.layout_input",outputLabelKey:"tools.moving.layout_output",
        aiPrompt:"あなたはインテリアコーディネーターです。新居の写真から最適な家具配置を提案してください。動線と収納効率を考慮してください。"}
    ]
  },
  {
    id:"kid",emoji:"🧒",gradient:"from-yellow-400 to-orange-400",bgLight:"bg-yellow-50",
    tools:[
      {id:"story",nameKey:"tools.kid.story",emoji:"📖",type:"form-input",
        inputLabelKey:"tools.kid.story_input",outputLabelKey:"tools.kid.story_output",
        fields:[{name:"子供の年齢",placeholder:"例: 5歳"},{name:"テーマ",placeholder:"例: 勇気、友情"},{name:"好きなもの",placeholder:"例: 恐竜、宇宙"}],
        aiPrompt:"あなたは絵本作家です。子供の年齢に合ったオリジナルの短いお話を作成してください。教育的な要素も自然に盛り込んでください。"},
      {id:"quiz",nameKey:"tools.kid.quiz",emoji:"❓",type:"form-input",
        inputLabelKey:"tools.kid.quiz_input",outputLabelKey:"tools.kid.quiz_output",
        fields:[{name:"年齢",placeholder:"例: 8歳"},{name:"教科",placeholder:"例: 算数、理科"},{name:"苦手なところ",placeholder:"例: かけ算"}],
        aiPrompt:"あなたは子供向けの家庭教師です。年齢に合った楽しいクイズを5問作成してください。ヒントと解説も付けてください。"},
      {id:"craft",nameKey:"tools.kid.craft",emoji:"✂️",type:"form-input",
        inputLabelKey:"tools.kid.craft_input",outputLabelKey:"tools.kid.craft_output",
        fields:[{name:"年齢",placeholder:"例: 6歳"},{name:"材料",placeholder:"例: 牛乳パック、折り紙"},{name:"テーマ",placeholder:"例: 動物"}],
        aiPrompt:"あなたは工作の先生です。材料で作れる楽しい工作アイデアを提案してください。手順をイラスト付きで説明するように記載してください。"}
    ]
  },
  {
    id:"senior",emoji:"👴",gradient:"from-teal-500 to-green-600",bgLight:"bg-teal-50",
    tools:[
      {id:"health",nameKey:"tools.senior.health",emoji:"💊",type:"form-input",
        inputLabelKey:"tools.senior.health_input",outputLabelKey:"tools.senior.health_output",
        fields:[{name:"年齢",placeholder:"例: 70歳"},{name:"持病",placeholder:"例: 高血圧"},{name:"気になること",placeholder:"例: 膝の痛み"}],
        aiPrompt:"あなたはシニア向けの健康アドバイザーです。年齢と健康状態に合った生活アドバイスを提供してください。必ず「医師への相談を推奨」と記載してください。"},
      {id:"digital",nameKey:"tools.senior.digital",emoji:"📱",type:"text-input",
        inputLabelKey:"tools.senior.digital_input",outputLabelKey:"tools.senior.digital_output",
        placeholder:"例: LINEでビデオ通話のやり方がわからない",
        aiPrompt:"あなたはシニア向けのデジタル教室の先生です。スマホやパソコンの操作方法を大きな文字で、専門用語を使わず、ステップバイステップで説明してください。"},
      {id:"memory",nameKey:"tools.senior.memory",emoji:"📷",type:"image-upload",
        inputLabelKey:"tools.senior.memory_input",outputLabelKey:"tools.senior.memory_output",
        aiPrompt:"あなたは回想法の専門家です。古い写真から時代背景や思い出を語りかけるような文章を生成してください。温かみのある文体で。"}
    ]
  },
  {
    id:"date",emoji:"❤️",gradient:"from-red-400 to-pink-500",bgLight:"bg-red-50",
    tools:[
      {id:"plan",nameKey:"tools.date.plan",emoji:"📍",type:"form-input",
        inputLabelKey:"tools.date.plan_input",outputLabelKey:"tools.date.plan_output",
        fields:[{name:"エリア",placeholder:"例: 表参道〜渋谷"},{name:"時間帯",placeholder:"例: 午後〜夜"},{name:"雰囲気",placeholder:"例: おしゃれ、カジュアル"},{name:"予算",placeholder:"例: 1万円"}],
        aiPrompt:"あなたはデートプランナーです。条件に合ったデートコースを提案してください。時間配分、お店の提案、会話のネタも記載してください。"},
      {id:"gift",nameKey:"tools.date.gift",emoji:"🎁",type:"form-input",
        inputLabelKey:"tools.date.gift_input",outputLabelKey:"tools.date.gift_output",
        fields:[{name:"相手",placeholder:"例: 20代女性、付き合って半年"},{name:"予算",placeholder:"例: 1万円"},{name:"好み",placeholder:"例: 甘いもの、アクセサリー"}],
        aiPrompt:"あなたはギフトコンシェルジュです。相手の情報から最適なプレゼントを5つ提案してください。購入場所と選んだ理由も記載してください。"},
      {id:"message",nameKey:"tools.date.message",emoji:"💌",type:"text-input",
        inputLabelKey:"tools.date.message_input",outputLabelKey:"tools.date.message_output",
        placeholder:"例: 初デート後のお礼メッセージ。楽しかったと伝えたい。",
        aiPrompt:"あなたは恋愛コミュニケーションの専門家です。場面に合ったメッセージを3パターン(カジュアル・丁寧・ロマンチック)で作成してください。"}
    ]
  },
  {
    id:"car",emoji:"🚗",gradient:"from-blue-600 to-indigo-700",bgLight:"bg-blue-50",
    tools:[
      {id:"diagnose",nameKey:"tools.car.diagnose",emoji:"🔧",type:"text-input",
        inputLabelKey:"tools.car.diagnose_input",outputLabelKey:"tools.car.diagnose_output",
        placeholder:"例: エンジンをかけると異音がする。キュルキュルという音。",
        aiPrompt:"あなたは自動車整備士です。症状から考えられる原因と対処法を説明してください。緊急度と修理費の目安も記載してください。"},
      {id:"cost",nameKey:"tools.car.cost",emoji:"💰",type:"form-input",
        inputLabelKey:"tools.car.cost_input",outputLabelKey:"tools.car.cost_output",
        fields:[{name:"車種",placeholder:"例: トヨタ ヤリス"},{name:"年間走行距離",placeholder:"例: 10,000km"},{name:"駐車場代",placeholder:"例: 月2万円"}],
        aiPrompt:"あなたは車の維持費の専門家です。年間の維持費(ガソリン、保険、車検、税金、駐車場)を試算してください。節約ポイントも記載してください。"},
      {id:"compare",nameKey:"tools.car.compare",emoji:"🔍",type:"form-input",
        inputLabelKey:"tools.car.compare_input",outputLabelKey:"tools.car.compare_output",
        fields:[{name:"候補1",placeholder:"例: トヨタ ヤリス"},{name:"候補2",placeholder:"例: ホンダ フィット"},{name:"重視ポイント",placeholder:"例: 燃費、安全性"}],
        aiPrompt:"あなたは車の比較レビュアーです。2車種を燃費、安全性、価格、室内空間、走行性能で比較してください。"}
    ]
  },
  {
    id:"sleep",emoji:"😴",gradient:"from-indigo-500 to-purple-700",bgLight:"bg-indigo-50",
    tools:[
      {id:"analyze",nameKey:"tools.sleep.analyze",emoji:"📊",type:"form-input",
        inputLabelKey:"tools.sleep.analyze_input",outputLabelKey:"tools.sleep.analyze_output",
        fields:[{name:"就寝時間",placeholder:"例: 0:30"},{name:"起床時間",placeholder:"例: 7:00"},{name:"悩み",placeholder:"例: 寝つきが悪い、途中で起きる"}],
        aiPrompt:"あなたは睡眠コンサルタントです。睡眠パターンを分析し、質を改善するための具体的なアドバイスを提供してください。"},
      {id:"routine",nameKey:"tools.sleep.routine",emoji:"🌙",type:"form-input",
        inputLabelKey:"tools.sleep.routine_input",outputLabelKey:"tools.sleep.routine_output",
        fields:[{name:"仕事時間",placeholder:"例: 9時〜18時"},{name:"悩み",placeholder:"例: 夜型を直したい"},{name:"生活習慣",placeholder:"例: 寝る前にスマホ"}],
        aiPrompt:"あなたは睡眠改善の専門家です。生活リズムに合った理想的なナイトルーティンを提案してください。時間割形式で記載してください。"},
      {id:"sound",nameKey:"tools.sleep.sound",emoji:"🎵",type:"form-input",
        inputLabelKey:"tools.sleep.sound_input",outputLabelKey:"tools.sleep.sound_output",
        fields:[{name:"好みの音",placeholder:"例: 雨音、波の音"},{name:"目的",placeholder:"例: 入眠、リラックス"}],
        aiPrompt:"あなたは音響療法の専門家です。好みに合った睡眠用サウンドスケープの構成を提案してください。おすすめアプリやYouTubeチャンネルも記載してください。"}
    ]
  },
  {
    id:"eco",emoji:"🌍",gradient:"from-green-500 to-emerald-600",bgLight:"bg-green-50",
    tools:[
      {id:"footprint",nameKey:"tools.eco.footprint",emoji:"👣",type:"form-input",
        inputLabelKey:"tools.eco.footprint_input",outputLabelKey:"tools.eco.footprint_output",
        fields:[{name:"移動手段",placeholder:"例: 車通勤 往復30km"},{name:"食生活",placeholder:"例: 肉多め"},{name:"電気使用量",placeholder:"例: 月300kWh"}],
        aiPrompt:"あなたは環境コンサルタントです。生活情報からCO2排出量を推定し、削減のための具体的なアクションを提案してください。"},
      {id:"swap",nameKey:"tools.eco.swap",emoji:"♻️",type:"image-upload",
        inputLabelKey:"tools.eco.swap_input",outputLabelKey:"tools.eco.swap_output",
        aiPrompt:"あなたはサステナブルライフの専門家です。日用品の写真からエコフレンドリーな代替品を提案してください。コストと環境効果も記載してください。"},
      {id:"save",nameKey:"tools.eco.save",emoji:"⚡",type:"form-input",
        inputLabelKey:"tools.eco.save_input",outputLabelKey:"tools.eco.save_output",
        fields:[{name:"住居タイプ",placeholder:"例: マンション 2LDK"},{name:"月の電気代",placeholder:"例: 8000円"},{name:"家電",placeholder:"例: エアコン2台、冷蔵庫"}],
        aiPrompt:"あなたは省エネアドバイザーです。電力使用状況を分析し、節電の具体的な方法と月の節約額を提案してください。"}
    ]
  },
  {
    id:"invest",emoji:"📈",gradient:"from-emerald-600 to-teal-700",bgLight:"bg-emerald-50",
    tools:[
      {id:"analysis",nameKey:"tools.invest.analysis",emoji:"📊",type:"form-input",
        inputLabelKey:"tools.invest.analysis_input",outputLabelKey:"tools.invest.analysis_output",
        fields:[{name:"銘柄・商品",placeholder:"例: S&P500, 全世界株式"},{name:"投資額",placeholder:"例: 月3万円"},{name:"期間",placeholder:"例: 20年"}],
        aiPrompt:"あなたは投資教育の専門家です。投資情報から期待リターンとリスクを分析してください。投資助言ではなく一般的な教育情報である旨を記載してください。"},
      {id:"portfolio",nameKey:"tools.invest.portfolio",emoji:"🥧",type:"form-input",
        inputLabelKey:"tools.invest.portfolio_input",outputLabelKey:"tools.invest.portfolio_output",
        fields:[{name:"年齢",placeholder:"例: 30歳"},{name:"リスク許容度",placeholder:"例: 中程度"},{name:"投資可能額",placeholder:"例: 月5万円"}],
        aiPrompt:"あなたは資産配分の教育者です。年齢とリスク許容度に合った資産配分の考え方を紹介してください。投資助言ではなく一般的な教育情報である旨を記載してください。"},
      {id:"news",nameKey:"tools.invest.news",emoji:"📰",type:"text-input",
        inputLabelKey:"tools.invest.news_input",outputLabelKey:"tools.invest.news_output",
        placeholder:"例: 米国の利下げが日本株に与える影響",
        aiPrompt:"あなたは経済ニュースの解説者です。経済トピックをわかりやすく解説してください。投資判断の材料ではなく教育目的である旨を記載してください。"}
    ]
  },
  {
    id:"therapy",emoji:"🧘",gradient:"from-purple-400 to-indigo-500",bgLight:"bg-purple-50",
    tools:[
      {id:"journal",nameKey:"tools.therapy.journal",emoji:"📔",type:"text-input",
        inputLabelKey:"tools.therapy.journal_input",outputLabelKey:"tools.therapy.journal_output",
        placeholder:"今日あったこと、感じたことを自由に書いてください",
        aiPrompt:"あなたは優しいカウンセラーです。日記の内容に共感しながら、感情を整理するための質問やポジティブな気づきを提供してください。専門的な治療ではない旨を記載してください。"},
      {id:"breathe",nameKey:"tools.therapy.breathe",emoji:"🌬️",type:"form-input",
        inputLabelKey:"tools.therapy.breathe_input",outputLabelKey:"tools.therapy.breathe_output",
        fields:[{name:"今の気分",placeholder:"例: 不安、イライラ"},{name:"使える時間",placeholder:"例: 5分"}],
        aiPrompt:"あなたはマインドフルネスの専門家です。気分に合った呼吸法とリラクゼーション方法をステップバイステップで案内してください。"},
      {id:"cbt",nameKey:"tools.therapy.cbt",emoji:"🧠",type:"text-input",
        inputLabelKey:"tools.therapy.cbt_input",outputLabelKey:"tools.therapy.cbt_output",
        placeholder:"例: 仕事でミスをして、自分はダメだと感じている",
        aiPrompt:"あなたは認知行動療法の教育者です。ネガティブな思考パターンを特定し、より柔軟な考え方を提案してください。専門的なカウンセリングではない旨を記載してください。"}
    ]
  },
  {
    id:"fashion",emoji:"👗",gradient:"from-fuchsia-500 to-pink-600",bgLight:"bg-fuchsia-50",
    tools:[
      {id:"coord",nameKey:"tools.fashion.coord",emoji:"👔",type:"image-upload",
        inputLabelKey:"tools.fashion.coord_input",outputLabelKey:"tools.fashion.coord_output",
        aiPrompt:"あなたはファッションスタイリストです。手持ちの服の写真からコーディネートを提案してください。トレンドも取り入れてください。"},
      {id:"trend",nameKey:"tools.fashion.trend",emoji:"📈",type:"form-input",
        inputLabelKey:"tools.fashion.trend_input",outputLabelKey:"tools.fashion.trend_output",
        fields:[{name:"好きなスタイル",placeholder:"例: ミニマル、ストリート"},{name:"年齢",placeholder:"例: 20代後半"},{name:"予算",placeholder:"例: 月2万円"}],
        aiPrompt:"あなたはファッショントレンドアナリストです。スタイルと予算に合った今季のトレンドアイテムとコーディネートを提案してください。"},
      {id:"capsule",nameKey:"tools.fashion.capsule",emoji:"🗂️",type:"form-input",
        inputLabelKey:"tools.fashion.capsule_input",outputLabelKey:"tools.fashion.capsule_output",
        fields:[{name:"季節",placeholder:"例: 春夏"},{name:"予算",placeholder:"例: 5万円"},{name:"スタイル",placeholder:"例: ビジネスカジュアル"}],
        aiPrompt:"あなたはカプセルワードローブの専門家です。最小限のアイテムで最大限のコーデが組める服リストを提案してください。"}
    ]
  },
  {
    id:"garden",emoji:"🌻",gradient:"from-lime-500 to-green-600",bgLight:"bg-lime-50",
    tools:[
      {id:"identify",nameKey:"tools.garden.identify",emoji:"🔍",type:"image-upload",
        inputLabelKey:"tools.garden.identify_input",outputLabelKey:"tools.garden.identify_output",
        aiPrompt:"あなたは植物学者です。植物の写真から種類を特定し、育て方(水やり、日光、土)のアドバイスを提供してください。"},
      {id:"calendar",nameKey:"tools.garden.calendar",emoji:"📅",type:"form-input",
        inputLabelKey:"tools.garden.calendar_input",outputLabelKey:"tools.garden.calendar_output",
        fields:[{name:"地域",placeholder:"例: 関東"},{name:"スペース",placeholder:"例: ベランダ"},{name:"育てたいもの",placeholder:"例: ハーブ、トマト"}],
        aiPrompt:"あなたはガーデニングの専門家です。条件に合った月ごとの栽培カレンダーを作成してください。種まき、植え付け、収穫のタイミングを記載してください。"},
      {id:"trouble",nameKey:"tools.garden.trouble",emoji:"🐛",type:"image-upload",
        inputLabelKey:"tools.garden.trouble_input",outputLabelKey:"tools.garden.trouble_output",
        aiPrompt:"あなたは植物のドクターです。植物のトラブル写真から病気や害虫を特定し、対処法を提案してください。予防法も記載してください。"}
    ]
  },
  {
    id:"biz",emoji:"💼",gradient:"from-gray-700 to-gray-900",bgLight:"bg-gray-50",
    tools:[
      {id:"swot",nameKey:"tools.biz.swot",emoji:"📊",type:"form-input",
        inputLabelKey:"tools.biz.swot_input",outputLabelKey:"tools.biz.swot_output",
        fields:[{name:"事業内容",placeholder:"例: オンライン英会話サービス"},{name:"強み",placeholder:"例: 低価格、24時間対応"},{name:"競合",placeholder:"例: DMM英会話、レアジョブ"}],
        aiPrompt:"あなたはビジネスコンサルタントです。事業情報からSWOT分析を行い、戦略的な示唆を提供してください。"},
      {id:"pitch",nameKey:"tools.biz.pitch",emoji:"🎯",type:"text-input",
        inputLabelKey:"tools.biz.pitch_input",outputLabelKey:"tools.biz.pitch_output",
        placeholder:"例: AIを使った個人向け栄養管理アプリ。忙しい会社員がターゲット。",
        aiPrompt:"あなたはスタートアップアドバイザーです。事業アイデアからエレベーターピッチと事業計画の骨子を作成してください。"},
      {id:"email",nameKey:"tools.biz.email",emoji:"📧",type:"text-input",
        inputLabelKey:"tools.biz.email_input",outputLabelKey:"tools.biz.email_output",
        placeholder:"例: クライアントに納期遅延のお詫びと新しいスケジュールの提案",
        aiPrompt:"あなたはビジネスコミュニケーションの専門家です。要点からプロフェッショナルなビジネスメールを作成してください。"}
    ]
  },
  {
    id:"lang",emoji:"🗣️",gradient:"from-sky-500 to-blue-600",bgLight:"bg-sky-50",
    tools:[
      {id:"conv",nameKey:"tools.lang.conv",emoji:"💬",type:"text-input",
        inputLabelKey:"tools.lang.conv_input",outputLabelKey:"tools.lang.conv_output",
        placeholder:"例: I'd like to book a table for two tonight.",
        aiPrompt:"あなたは語学の先生です。ユーザーの外国語文を添削し、文法・表現・自然さをフィードバックしてください。より良い表現も提案してください。"},
      {id:"vocab",nameKey:"tools.lang.vocab",emoji:"📝",type:"form-input",
        inputLabelKey:"tools.lang.vocab_input",outputLabelKey:"tools.lang.vocab_output",
        fields:[{name:"言語",placeholder:"例: 英語、韓国語"},{name:"レベル",placeholder:"例: TOEIC 600目標"},{name:"テーマ",placeholder:"例: ビジネス、旅行"}],
        aiPrompt:"あなたは語学教師です。条件に合った重要単語リストを10語作成してください。例文と発音ガイドも記載してください。"},
      {id:"trans",nameKey:"tools.lang.trans",emoji:"🌐",type:"text-input",
        inputLabelKey:"tools.lang.trans_input",outputLabelKey:"tools.lang.trans_output",
        placeholder:"例: この案件について、来週中にお返事いただけますでしょうか。",
        aiPrompt:"あなたはプロの翻訳者です。テキストを翻訳し、重要な表現やニュアンスの解説も付けてください。"}
    ]
  },
  {
    id:"archive",emoji:"🗂️",gradient:"from-amber-500 to-yellow-600",bgLight:"bg-amber-50",
    tools:[
      {id:"closet",nameKey:"tools.archive.closet",emoji:"👕",type:"image-upload",
        inputLabelKey:"tools.archive.closet_input",outputLabelKey:"tools.archive.closet_output",
        aiPrompt:"あなたは整理収納アドバイザーです。クローゼットの写真から断捨離のアドバイスと効率的な収納方法を提案してください。"},
      {id:"desk",nameKey:"tools.archive.desk",emoji:"🖥️",type:"image-upload",
        inputLabelKey:"tools.archive.desk_input",outputLabelKey:"tools.archive.desk_output",
        aiPrompt:"あなたはデスク環境の専門家です。デスクの写真から作業効率を上げるための改善ポイントを提案してください。"},
      {id:"digital",nameKey:"tools.archive.digital",emoji:"📱",type:"form-input",
        inputLabelKey:"tools.archive.digital_input",outputLabelKey:"tools.archive.digital_output",
        fields:[{name:"アプリ数(目安)",placeholder:"例: 120個くらい"},{name:"写真枚数",placeholder:"例: 15000枚"},{name:"ストレージ残り",placeholder:"例: 5GB"}],
        aiPrompt:"あなたはデジタル整理の専門家です。スマホの整理プランを作成してください。アプリの断捨離、写真の整理、ストレージ節約の方法を記載してください。"}
    ]
  },
  {
    id:"event",emoji:"🎉",gradient:"from-pink-500 to-rose-600",bgLight:"bg-pink-50",
    tools:[
      {id:"plan",nameKey:"tools.event.plan",emoji:"📋",type:"form-input",
        inputLabelKey:"tools.event.plan_input",outputLabelKey:"tools.event.plan_output",
        fields:[{name:"種類",placeholder:"例: 誕生日会、忘年会"},{name:"人数",placeholder:"例: 15人"},{name:"予算",placeholder:"例: 5万円"},{name:"場所",placeholder:"例: 東京都内"}],
        aiPrompt:"あなたはイベントプランナーです。条件に合ったイベントの企画プランを作成してください。タイムライン、会場候補、食事、演出を記載してください。"},
      {id:"invite",nameKey:"tools.event.invite",emoji:"💌",type:"text-input",
        inputLabelKey:"tools.event.invite_input",outputLabelKey:"tools.event.invite_output",
        placeholder:"例: 3/15 土曜 18時から渋谷で花子の誕生日会。会費3000円。",
        aiPrompt:"あなたは招待状ライターです。イベント情報からおしゃれな招待状テキストを作成してください。LINE、Instagram、メール向けの3パターンを提供してください。"},
      {id:"gift",nameKey:"tools.event.gift",emoji:"🎁",type:"form-input",
        inputLabelKey:"tools.event.gift_input",outputLabelKey:"tools.event.gift_output",
        fields:[{name:"相手",placeholder:"例: 30代女性、同僚"},{name:"予算",placeholder:"例: 5000円"},{name:"好み",placeholder:"例: コスメ好き、猫好き"}],
        aiPrompt:"あなたはギフトコンシェルジュです。相手の情報から最適なプレゼントを5つ提案してください。購入場所とおすすめ理由も記載してください。"}
    ]
  },
  {
    id:"access",emoji:"♿",gradient:"from-teal-500 to-cyan-600",bgLight:"bg-teal-50",
    tools:[
      {id:"web",nameKey:"tools.access.web",emoji:"🌐",type:"text-input",
        inputLabelKey:"tools.access.web_input",outputLabelKey:"tools.access.web_output",
        placeholder:"例: https://example.com",
        aiPrompt:"あなたはWebアクセシビリティの専門家です。URLから一般的なアクセシビリティ問題を分析し、WCAG 2.1準拠のための改善提案をしてください。"},
      {id:"doc",nameKey:"tools.access.doc",emoji:"📄",type:"text-input",
        inputLabelKey:"tools.access.doc_input",outputLabelKey:"tools.access.doc_output",
        placeholder:"例: 当施設では、利用者の皆様に対し、所定の手続きを経た上で、各種サービスの提供を行っております。",
        aiPrompt:"あなたはやさしい日本語の専門家です。難しい文章を外国人や高齢者にも理解しやすい「やさしい日本語」に変換してください。ふりがなも付けてください。"},
      {id:"sign",nameKey:"tools.access.sign",emoji:"🪧",type:"form-input",
        inputLabelKey:"tools.access.sign_input",outputLabelKey:"tools.access.sign_output",
        fields:[{name:"内容",placeholder:"例: トイレの場所案内"},{name:"設置場所",placeholder:"例: 商業施設の1階"},{name:"対象者",placeholder:"例: 外国人観光客、高齢者"}],
        aiPrompt:"あなたはユニバーサルデザインの専門家です。多言語対応でアクセシブルな案内板のデザイン提案をしてください。ピクトグラムの使い方も記載してください。"}
    ]
  },
  {
    id:"news",emoji:"📰",gradient:"from-slate-600 to-gray-800",bgLight:"bg-slate-50",
    tools:[
      {id:"summary",nameKey:"tools.news.summary",emoji:"📋",type:"text-input",
        inputLabelKey:"tools.news.summary_input",outputLabelKey:"tools.news.summary_output",
        placeholder:"例: ニュース記事のURLまたは本文を貼り付け",
        aiPrompt:"あなたはニュース要約の専門家です。記事を3行で要約し、キーワードと関連トピックも記載してください。"},
      {id:"brief",nameKey:"tools.news.brief",emoji:"☀️",type:"form-input",
        inputLabelKey:"tools.news.brief_input",outputLabelKey:"tools.news.brief_output",
        fields:[{name:"興味のある分野",placeholder:"例: テクノロジー、経済"},{name:"読みたい量",placeholder:"例: 5分で読める量"},{name:"言語",placeholder:"例: 日本語"}],
        aiPrompt:"あなたはニュースキュレーターです。分野に合った今日の重要ニュースをブリーフィング形式でまとめてください。"},
      {id:"fact",nameKey:"tools.news.fact",emoji:"🔍",type:"text-input",
        inputLabelKey:"tools.news.fact_input",outputLabelKey:"tools.news.fact_output",
        placeholder:"例: 日本の人口は2025年に1億人を下回った",
        aiPrompt:"あなたはファクトチェッカーです。情報の真偽を分析し、根拠となるデータや出典を示してください。判定(正確/不正確/部分的に正確)を明示してください。"}
    ]
  }
];
