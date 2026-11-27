// mig-countries.js — «9. Муҳоҷират»: справки по странам кроме России (Россия — MIG_GUIDES в server.js). Только факты из источников,
// без поиска и без ИИ. Проверено 27.11.2026:
// Казахстан — регистрация с 01.07.2026: не позже 30-го дня после въезда, сведения вносит сам иммигрант в ИС МВД, хозяин жилья
//   подтверждает в мобильном приложении, смена адреса — 5 рабочих дней, отказ при недостоверных сведениях или отказе хозяина
//   (Приказ МВД РК №923 от 17.11.2025; Zakon.kz и mybuh.kz, 25.11.2025); электронное разрешение на въезд: бесплатно, за 72 часа,
//   обязательно с 01.07.2027, для граждан безвизовых стран (Zakon.kz, 14.10.2026); разрешение трудовому иммигранту — только онлайн
//   с 13.04.2026, eGov.kz / migration.enbek.kz, 1–12 месяцев в пределах квоты (МТСЗН РК, gov.kz, 11.04.2026); ИПН 4 МРП в месяц
//   до получения и продления (mybuh.kz, 15.12.2025); МРП 2026 = 4 325 тенге (Tengrinews, 26.11.2025); контакт-центр eGov 1414,
//   8 800 080 7777 (gov.kz/services/3187).
// Великобритания — Seasonal Worker visa: спонсор, только работа из сертификата, садоводство до 6 месяцев, птицеводство 2.10–31.12,
//   £340, без семьи, подача за 3 месяца, въезд за 14 дней (gov.uk/seasonal-worker-visa, 25.11.2026); операторы AGRI-HR, Concordia,
//   Fruitful Jobs, HOPS, Pro-Force, RE Recruitment (птица), агенты — в реестре GLAA, денег за визу не берут, National Living Wage
//   за ≥32 ч, жильё без предоплаты (gov.uk «Seasonal work on farms: guidance for workers», 16.03.2026); ≈2 200 человек через оргнабор
//   в I полугодии 2026 (Караван Инфо, 08.08.2026); Modern Slavery & Exploitation Helpline 08000 121 700 (unseenuk.org).
// Корея — EPS-TOPIK: Агентство по трудоустройству за рубежом, Душанбе, ул. Лохути 80, тел. 221-39-83, 221-39-67, 93-093-49-94
//   (WhatsApp, Telegram), 18–39 лет, без судимости, инфекций и депортации из Кореи, данные латиницей как в паспорте, 330 сомони
//   (Asia-Plus, 29.07.2026); отрасли (Asia-Plus, 10.07.2025); E-9 до 4 лет 10 месяцев, смена работодателя — только в установленных
//   случаях, выбор из списка кандидатов, ARC за 90 дней, сборы посредников запрещены (seoulstart.com, EPS guide, 17.10.2026);
//   1345 — многоязычный контакт-центр иммиграционной службы (immigration.go.kr); 112 полиция, 119 пожарные и скорая.
'use strict';

const TJ_AGENCY = { ru: 'Агентство занятости', tg: 'Агентии шуғл', uz: 'Bandlik agentligi' };
const agencyBtn = l => ({ label: `📞 ${TJ_AGENCY[l]} · +992 918 88-86-79`, href: 'tel:+992918888679', main: true });
const consular = { ru: '🌍 Консульская служба МИД (consular.tj)', tg: '🌍 Хадамоти консулии ВКХ (consular.tj)', uz: '🌍 TIV konsullik xizmati (consular.tj)' };
const consularBtn = l => ({ label: consular[l], href: 'https://consular.tj/' });
const EMB = {
    ru: { head: '🌍 Посольство и консульство', text: 'Потеряли паспорт, задержали, нужна справка — обращайтесь в посольство или консульство Таджикистана.' },
    tg: { head: '🌍 Сафорат ва консулгарӣ', text: 'Шиносномаро гум кардед, боздошт шудед, маълумотнома лозим — ба сафорат ё консулгарии Тоҷикистон муроҷиат кунед.' },
    uz: { head: '🌍 Elchixona va konsullik', text: "Pasportni yo'qotdingiz, ushlandingiz, ma'lumotnoma kerak — Tojikiston elchixonasi yoki konsulligiga murojaat qiling." }
};
const emb = l => ({ head: EMB[l].head, text: [EMB[l].text], btns: [consularBtn(l)] });
const SMS = {
    ru: { head: '🏢 Служба миграции (Душанбе)', text: ['Адрес: ул. С. Айни, 121.', 'Телефоны: 225-05-75, 225-05-91, 225-05-89.'], site: '🌐 Сайт migration.tj' },
    tg: { head: '🏢 Хадамоти муҳоҷират (Душанбе)', text: ['Суроға: кӯчаи С. Айнӣ, 121.', 'Телефонҳо: 225-05-75, 225-05-91, 225-05-89.'], site: '🌐 Сомонаи migration.tj' },
    uz: { head: '🏢 Migratsiya xizmati (Dushanbe)', text: ["Manzil: S. Ayniy ko'chasi, 121.", 'Telefonlar: 225-05-75, 225-05-91, 225-05-89.'], site: '🌐 migration.tj sayti' }
};
const sms = l => ({ head: SMS[l].head, text: SMS[l].text, btns: [{ label: SMS[l].site, href: 'https://migration.tj/' }] });
const FREE_INFO = {
    ru: 'По новому закону «О миграции» Служба миграции бесплатно рассказывает о вакансиях за рубежом, зарплатах и условиях работы.',
    tg: 'Тибқи қонуни нави «Дар бораи муҳоҷират» Хадамоти муҳоҷират дар бораи ҷойҳои кори хориҷа, музд ва шароити кор ройгон маълумот медиҳад.',
    uz: "Yangi «Migratsiya to'g'risida»gi qonunga ko'ra Migratsiya xizmati chet eldagi bo'sh ish o'rinlari, maosh va ish sharoitlari haqida bepul ma'lumot beradi."
};
const NO_MIDDLE = {
    ru: { head: '🛡 Осторожно', text: ['Не платите посредникам за «гарантированную работу». Ищите работу сами или через организации, у которых есть право на набор.'] },
    tg: { head: '🛡 Эҳтиёт шавед', text: ['Ба миёнаравҳо барои «кори кафолатнок» пул надиҳед. Корро худатон ё тавассути ташкилотҳое ҷӯед, ки ҳуқуқи ҷалби коргар доранд.'] },
    uz: { head: "🛡 Ehtiyot bo'ling", text: ["«Kafolatli ish» uchun vositachilarga pul to'lamang. Ishni o'zingiz yoki ishchi yollash huquqi bor tashkilotlar orqali qidiring."] }
};
const RENT = {
    ru: { head: '🔑 Как снять жильё', text: ['Ищите через крупные сайты объявлений и людей, которым доверяете.', 'Не переводите залог, пока не увидели жильё и документы хозяина.'] },
    tg: { head: '🔑 Чӣ тавр манзил гирифтан', text: ['Тавассути сомонаҳои калони эълонҳо ва одамоне ҷӯед, ки ба онҳо бовар доред.', 'То манзил ва ҳуҷҷатҳои соҳибашро надидаед, гарав нафиристед.'] },
    uz: { head: '🔑 Uy-joyni qanday ijaraga olish', text: ["Katta e'lon saytlari va ishonadigan odamlaringiz orqali qidiring.", "Uy-joy va uy egasining hujjatlarini ko'rmaguningizcha garov pulini o'tkazmang."] }
};

const KZ_EMB = 'https://www.gov.kz/memleket/entities/mfa-dushanbe';
const KZ_EGOV = 'https://egov.kz/cms/ru/articles/workpermit';
const KZ_ENBEK = 'https://migration.enbek.kz/';
const GB_VISA = 'https://www.gov.uk/seasonal-worker-visa';
const GB_FARM = 'https://www.gov.uk/guidance/seasonal-work-on-farms-guidance-for-workers';
const KR_PHONES = [['221-39-83', 'tel:+992372213983'], ['221-39-67', 'tel:+992372213967'], ['+992 93 093 49 94', 'tel:+992930934994']];
const krBtns = () => KR_PHONES.map(([l, h], i) => ({ label: '📞 ' + l, href: h, main: !i }));

const MIG_COUNTRY_GUIDES = {
    kz: {
        mig_docs: {
            ru: [
                { head: '✈️ Въезд в Казахстан', text: ['Казахстан вводит электронное разрешение на въезд для граждан безвизовых стран: бесплатно, через госпортал, не позже чем за 72 часа до въезда.', 'С 1 июля 2027 года без него во въезде откажут. Касается ли это граждан Таджикистана — уточните в посольстве Казахстана перед поездкой.'], btns: [{ label: '🏛 Посольство Казахстана в Таджикистане', href: KZ_EMB }] },
                { head: '🏠 Регистрация (с 1 июля 2026 года)', text: ['Не позже 30-го дня после пересечения границы.', 'Свои данные Вы вносите сами в информационную систему МВД, а хозяин жилья подтверждает их в мобильном приложении.', 'Справка о регистрации появится в Вашем личном кабинете. Сменили адрес — зарегистрируйтесь заново за 5 рабочих дней.'] },
                { head: '📄 Разрешение на работу у частных лиц', text: ['С 13 апреля 2026 года — только онлайн: eGov.kz или migration.enbek.kz. В ЦОНах больше не выдают.', 'Даётся на срок от 1 до 12 месяцев в пределах квоты. Медсправку и страховку проверяют по базам сами.', 'До получения и продления платите налог (ИПН) — 4 МРП за каждый месяц: в 2026 году это 17 300 тенге.'], btns: [{ label: '🌐 eGov.kz', href: KZ_EGOV, main: true }, { label: '🌐 migration.enbek.kz', href: KZ_ENBEK }] },
                { head: '🛡 Осторожно', text: ['Регистрацию и разрешение оформляйте сами, только через официальные сервисы. Недостоверные сведения — причина отказа в регистрации.'] }
            ],
            tg: [
                { head: '✈️ Вуруд ба Қазоқистон', text: ['Қазоқистон барои шаҳрвандони кишварҳои бидуни раводид иҷозати электронии вурудро ҷорӣ мекунад: ройгон, тавассути портали давлатӣ, на дертар аз 72 соат пеш аз вуруд.', 'Аз 1 июли 2027 бе он вуруд намедиҳанд. Оё ин ба шаҳрвандони Тоҷикистон дахл дорад — пеш аз сафар дар сафорати Қазоқистон пурсед.'], btns: [{ label: '🏛 Сафорати Қазоқистон дар Тоҷикистон', href: KZ_EMB }] },
                { head: '🏠 Бақайдгирӣ (аз 1 июли 2026)', text: ['На дертар аз рӯзи 30-ум баъди гузаштан аз сарҳад.', 'Маълумоти худро худатон ба низоми иттилоотии ВКД ворид мекунед, соҳиби манзил онро дар барномаи мобилӣ тасдиқ мекунад.', 'Маълумотнома дар бораи бақайдгирӣ дар кабинети шахсии Шумо пайдо мешавад. Суроғаро иваз кардед — дар 5 рӯзи корӣ аз нав ба қайд гиред.'] },
                { head: '📄 Иҷозати кор дар назди шахсони хусусӣ', text: ['Аз 13 апрели 2026 — танҳо онлайн: eGov.kz ё migration.enbek.kz. Дар ЦОН-ҳо дигар намедиҳанд.', 'Аз 1 то 12 моҳ дар доираи квота дода мешавад. Маълумотномаи тиббӣ ва суғуртаро аз рӯи пойгоҳҳо худашон месанҷанд.', 'То гирифтан ва тамдид андоз (ИПН) супоред — барои ҳар моҳ 4 МРП: соли 2026 ин 17 300 тенге аст.'], btns: [{ label: '🌐 eGov.kz', href: KZ_EGOV, main: true }, { label: '🌐 migration.enbek.kz', href: KZ_ENBEK }] },
                { head: '🛡 Эҳтиёт шавед', text: ['Бақайдгирӣ ва иҷозатро худатон, танҳо тавассути хизматҳои расмӣ гиред. Маълумоти нодуруст — сабаби рад кардани бақайдгирӣ.'] }
            ],
            uz: [
                { head: "✈️ Qozog'istonga kirish", text: ["Qozog'iston vizasiz davlatlar fuqarolari uchun elektron kirish ruxsatini joriy qilmoqda: bepul, davlat portali orqali, kirishdan kamida 72 soat oldin.", "2027-yil 1-iyuldan usiz kiritilmaydi. Bu Tojikiston fuqarolariga taalluqlimi — safardan oldin Qozog'iston elchixonasidan aniqlang."], btns: [{ label: "🏛 Qozog'istonning Tojikistondagi elchixonasi", href: KZ_EMB }] },
                { head: "🏠 Ro'yxatga olish (2026-yil 1-iyuldan)", text: ["Chegarani kesib o'tgandan keyin 30-kundan kechiktirmay.", "Ma'lumotlaringizni IIV axborot tizimiga o'zingiz kiritasiz, uy egasi ularni mobil ilovada tasdiqlaydi.", "Ro'yxatga olish ma'lumotnomasi shaxsiy kabinetingizda paydo bo'ladi. Manzilni o'zgartirdingiz — 5 ish kuni ichida qayta ro'yxatdan o'ting."] },
                { head: '📄 Xususiy shaxslarda ishlash uchun ruxsat', text: ["2026-yil 13-apreldan — faqat onlayn: eGov.kz yoki migration.enbek.kz. XKMlarda endi berilmaydi.", "Kvota doirasida 1 oydan 12 oygacha beriladi. Tibbiy ma'lumotnoma va sug'urtani bazalar orqali o'zlari tekshiradi.", "Olish va uzaytirishdan oldin soliq (IPN) to'lang — har oy uchun 4 MRP: 2026-yilda bu 17 300 tenge."], btns: [{ label: '🌐 eGov.kz', href: KZ_EGOV, main: true }, { label: '🌐 migration.enbek.kz', href: KZ_ENBEK }] },
                { head: "🛡 Ehtiyot bo'ling", text: ["Ro'yxat va ruxsatni o'zingiz, faqat rasmiy xizmatlar orqali rasmiylashtiring. Noto'g'ri ma'lumot — ro'yxatga olishni rad etish sababi."] }
            ]
        },
        mig_work: {
            ru: [
                { head: '🤝 Через Минтруд Таджикистана', text: [FREE_INFO.ru], btns: [agencyBtn('ru'), { label: '🌐 Сайт migration.tj', href: 'https://migration.tj/' }] },
                { head: '📄 Работа у частных лиц', text: ['Работать у частного лица можно с разрешением трудовому иммигранту: оформляется онлайн на eGov.kz или migration.enbek.kz, от 1 до 12 месяцев.'], btns: [{ label: '🌐 migration.enbek.kz', href: KZ_ENBEK }] },
                NO_MIDDLE.ru
            ],
            tg: [
                { head: '🤝 Тавассути Вазорати меҳнат', text: [FREE_INFO.tg], btns: [agencyBtn('tg'), { label: '🌐 Сомонаи migration.tj', href: 'https://migration.tj/' }] },
                { head: '📄 Кор дар назди шахсони хусусӣ', text: ['Дар назди шахси хусусӣ бо иҷозати муҳоҷири меҳнатӣ кор кардан мумкин аст: онлайн дар eGov.kz ё migration.enbek.kz, аз 1 то 12 моҳ.'], btns: [{ label: '🌐 migration.enbek.kz', href: KZ_ENBEK }] },
                NO_MIDDLE.tg
            ],
            uz: [
                { head: '🤝 Tojikiston Mehnat vazirligi orqali', text: [FREE_INFO.uz], btns: [agencyBtn('uz'), { label: '🌐 migration.tj sayti', href: 'https://migration.tj/' }] },
                { head: '📄 Xususiy shaxslarda ishlash', text: ["Xususiy shaxsda mehnat muhojiri ruxsati bilan ishlash mumkin: eGov.kz yoki migration.enbek.kz orqali onlayn, 1 oydan 12 oygacha."], btns: [{ label: '🌐 migration.enbek.kz', href: KZ_ENBEK }] },
                NO_MIDDLE.uz
            ]
        },
        mig_home: {
            ru: [
                { head: '🏠 Регистрация по месту жительства', text: ['Зарегистрироваться можно в доме, квартире, общежитии, гостинице и другом жилье.', 'Хозяин жилья подтверждает Вашу регистрацию в мобильном приложении — договоритесь об этом до оплаты.', 'Сменили жильё — зарегистрируйтесь по новому адресу за 5 рабочих дней.'] },
                RENT.ru,
                { head: '🛡 Осторожно', text: ['Если хозяин откажется подтвердить регистрацию, Вам в ней откажут. Не снимайте жильё, где регистрацию не подтверждают.'] }
            ],
            tg: [
                { head: '🏠 Бақайдгирӣ дар ҷои зист', text: ['Дар хона, квартира, хобгоҳ, меҳмонхона ва дигар манзил ба қайд гирифтан мумкин аст.', 'Соҳиби манзил бақайдгирии Шуморо дар барномаи мобилӣ тасдиқ мекунад — пеш аз пардохт дар ин бора созиш кунед.', 'Манзилро иваз кардед — дар 5 рӯзи корӣ дар суроғаи нав ба қайд гиред.'] },
                RENT.tg,
                { head: '🛡 Эҳтиёт шавед', text: ['Агар соҳиби манзил бақайдгириро тасдиқ накунад, онро рад мекунанд. Манзилеро, ки бақайдгириро тасдиқ намекунанд, нагиред.'] }
            ],
            uz: [
                { head: "🏠 Yashash joyida ro'yxatga olish", text: ["Uy, kvartira, yotoqxona, mehmonxona va boshqa turar joyda ro'yxatdan o'tish mumkin.", "Uy egasi ro'yxatingizni mobil ilovada tasdiqlaydi — to'lashdan oldin shu haqda kelishib oling.", "Uy-joyni o'zgartirdingiz — 5 ish kuni ichida yangi manzil bo'yicha ro'yxatdan o'ting."] },
                RENT.uz,
                { head: "🛡 Ehtiyot bo'ling", text: ["Uy egasi ro'yxatni tasdiqlamasa, sizga rad etiladi. Ro'yxat tasdiqlanmaydigan uy-joyni ijaraga olmang."] }
            ]
        },
        mig_help: {
            ru: [emb('ru'), sms('ru'),
                { head: '🏛 Справочная eGov', text: ['Не приходит СМС-код или не получается услуга на eGov — Единый контакт-центр.'], btns: [{ label: '📞 1414', href: 'tel:1414', main: true }, { label: '📞 8 800 080 7777', href: 'tel:88000807777' }] },
                { head: '🚨 Экстренная помощь в Казахстане', text: ['Единый номер экстренных служб — 112.'], btns: [{ label: '📞 112', href: 'tel:112' }] }],
            tg: [emb('tg'), sms('tg'),
                { head: '🏛 Хадамоти маълумотии eGov', text: ['СМС-код намеояд ё хизмат дар eGov намешавад — Маркази ягонаи тамос.'], btns: [{ label: '📞 1414', href: 'tel:1414', main: true }, { label: '📞 8 800 080 7777', href: 'tel:88000807777' }] },
                { head: '🚨 Ёрии фаврӣ дар Қазоқистон', text: ['Рақами ягонаи хадамоти фаврӣ — 112.'], btns: [{ label: '📞 112', href: 'tel:112' }] }],
            uz: [emb('uz'), sms('uz'),
                { head: "🏛 eGov ma'lumot xizmati", text: ["SMS-kod kelmasa yoki eGov xizmati ishlamasa — Yagona aloqa markazi."], btns: [{ label: '📞 1414', href: 'tel:1414', main: true }, { label: '📞 8 800 080 7777', href: 'tel:88000807777' }] },
                { head: "🚨 Qozog'istonda shoshilinch yordam", text: ['Favqulodda xizmatlarning yagona raqami — 112.'], btns: [{ label: '📞 112', href: 'tel:112' }] }]
        }
    },
    gb: {
        mig_docs: {
            ru: [
                { head: '🛂 Виза сезонного работника', text: ['Нужен спонсор — лицензированный оператор программы. Работать можно только на той работе, что указана в сертификате спонсора.', 'Садоводство — до 6 месяцев, птицеводство — с 2 октября по 31 декабря.', 'Виза стоит £340. Семью взять с собой нельзя.'], btns: [{ label: '🌐 gov.uk: Seasonal Worker visa', href: GB_VISA, main: true }] },
                { head: '📅 Сроки', text: ['Подать заявление можно за 3 месяца до начала работы, въехать — не раньше чем за 14 дней до начала.'] },
                { head: '🛡 Осторожно', text: ['Оператор не берёт денег за визу. Вы платите только за визу и дорогу (иногда ещё — справка о несудимости, медсправка или сбор министерства труда).', 'Любые другие платежи, например «за перевод резюме», — мошенничество.'] }
            ],
            tg: [
                { head: '🛂 Раводиди коргари мавсимӣ', text: ['Сарпараст лозим аст — оператори иҷозатномадори барнома. Танҳо дар коре кор кардан мумкин аст, ки дар сертификати сарпараст навишта шудааст.', 'Боғдорӣ — то 6 моҳ, паррандапарварӣ — аз 2 октябр то 31 декабр.', 'Раводид £340 аст. Оиларо бо худ бурдан мумкин нест.'], btns: [{ label: '🌐 gov.uk: Seasonal Worker visa', href: GB_VISA, main: true }] },
                { head: '📅 Мӯҳлатҳо', text: ['Аризаро 3 моҳ пеш аз оғози кор додан мумкин аст, ворид шудан — на барвақттар аз 14 рӯз пеш аз оғоз.'] },
                { head: '🛡 Эҳтиёт шавед', text: ['Оператор барои раводид пул намегирад. Шумо танҳо барои раводид ва роҳ пардохт мекунед (баъзан боз — маълумотнома дар бораи судимӣ надоштан, маълумотномаи тиббӣ ё пардохти вазорати меҳнат).', 'Ҳар пардохти дигар, масалан «барои тарҷумаи резюме», — қаллобӣ аст.'] }
            ],
            uz: [
                { head: '🛂 Mavsumiy ishchi vizasi', text: ["Homiy kerak — dasturning litsenziyali operatori. Faqat homiy sertifikatida ko'rsatilgan ishda ishlash mumkin.", "Bog'dorchilik — 6 oygacha, parrandachilik — 2-oktyabrdan 31-dekabrgacha.", "Viza £340 turadi. Oilani olib borish mumkin emas."], btns: [{ label: '🌐 gov.uk: Seasonal Worker visa', href: GB_VISA, main: true }] },
                { head: '📅 Muddatlar', text: ["Arizani ish boshlanishidan 3 oy oldin berish mumkin, kirish — boshlanishidan 14 kundan oldin emas."] },
                { head: "🛡 Ehtiyot bo'ling", text: ["Operator viza uchun pul olmaydi. Siz faqat viza va yo'l uchun to'laysiz (ba'zan yana — sudlanmaganlik ma'lumotnomasi, tibbiy ma'lumotnoma yoki mehnat vazirligi yig'imi).", "Boshqa har qanday to'lov, masalan «rezyume tarjimasi uchun», — firibgarlik."] }
            ]
        },
        mig_work: {
            ru: [
                { head: '🤝 Через Минтруд Таджикистана', text: ['В первом полугодии 2026 года через оргнабор на сезонные сельхозработы в Великобританию поехали около 2 200 человек.', FREE_INFO.ru], btns: [agencyBtn('ru')] },
                { head: '🏢 Лицензированные операторы', text: ['AGRI-HR, Concordia, Fruitful Jobs, HOPS Labour Solutions, Pro-Force, RE Recruitment (только птицеводство).', 'Их агенты за рубежом должны быть в реестре GLAA.'], btns: [{ label: '🌐 gov.uk: работа на фермах', href: GB_FARM }] },
                { head: '💷 Зарплата', text: ['Не меньше National Living Wage (в Шотландии, Уэльсе и Северной Ирландии — сельхозставка) минимум за 32 часа в неделю.', 'Сдельно можно заработать больше, но не меньше минимума.'] }
            ],
            tg: [
                { head: '🤝 Тавассути Вазорати меҳнат', text: ['Дар нимсолаи аввали 2026 тавассути ҷалби муташаккилона ба корҳои мавсимии кишоварзӣ ба Британия тақрибан 2 200 нафар рафтанд.', FREE_INFO.tg], btns: [agencyBtn('tg')] },
                { head: '🏢 Операторҳои иҷозатномадор', text: ['AGRI-HR, Concordia, Fruitful Jobs, HOPS Labour Solutions, Pro-Force, RE Recruitment (танҳо паррандапарварӣ).', 'Агентҳои онҳо дар хориҷа бояд дар феҳристи GLAA бошанд.'], btns: [{ label: '🌐 gov.uk: кор дар фермаҳо', href: GB_FARM }] },
                { head: '💷 Музд', text: ['На камтар аз National Living Wage (дар Шотландия, Уэлс ва Ирландияи Шимолӣ — меъёри кишоварзӣ) ҳадди ақал барои 32 соат дар ҳафта.', 'Аз рӯи ҳаҷми кор зиёдтар гирифтан мумкин, вале на камтар аз ҳадди ақал.'] }
            ],
            uz: [
                { head: '🤝 Tojikiston Mehnat vazirligi orqali', text: ["2026-yilning birinchi yarmida uyushgan tarzda Britaniyaga mavsumiy qishloq xo'jaligi ishlariga taxminan 2 200 kishi ketdi.", FREE_INFO.uz], btns: [agencyBtn('uz')] },
                { head: '🏢 Litsenziyali operatorlar', text: ["AGRI-HR, Concordia, Fruitful Jobs, HOPS Labour Solutions, Pro-Force, RE Recruitment (faqat parrandachilik).", "Ularning chet eldagi agentlari GLAA reyestrida bo'lishi shart."], btns: [{ label: '🌐 gov.uk: fermalarda ish', href: GB_FARM }] },
                { head: '💷 Maosh', text: ["National Living Wage'dan kam emas (Shotlandiya, Uels va Shimoliy Irlandiyada — qishloq xo'jaligi stavkasi) haftasiga kamida 32 soat uchun.", "Ishbay ko'proq topish mumkin, lekin minimumdan kam emas."] }
            ]
        },
        mig_home: {
            ru: [
                { head: '🏠 Жильё на ферме', text: ['Обычно живут в жилье работодателя на ферме или рядом.', 'Плата за такое жильё ограничена законом. Платить за жильё заранее Вас просить не должны.'] },
                { head: '🛡 Осторожно', text: ['Просят заплатить за жильё вперёд — так быть не должно. Сообщите оператору программы.'] }
            ],
            tg: [
                { head: '🏠 Манзил дар ферма', text: ['Одатан дар манзили корфармо дар ферма ё дар наздикии он зиндагӣ мекунанд.', 'Пардохт барои чунин манзил бо қонун маҳдуд аст. Аз Шумо набояд пешакӣ пул барои манзил талаб кунанд.'] },
                { head: '🛡 Эҳтиёт шавед', text: ['Барои манзил пешакӣ пул мехоҳанд — ин набояд бошад. Ба оператори барнома хабар диҳед.'] }
            ],
            uz: [
                { head: '🏠 Fermadagi uy-joy', text: ["Odatda ish beruvchining fermadagi yoki yaqinidagi uy-joyida yashaladi.", "Bunday uy-joy haqi qonun bilan cheklangan. Sizdan uy-joy uchun oldindan pul so'ralmasligi kerak."] },
                { head: "🛡 Ehtiyot bo'ling", text: ["Uy-joy uchun oldindan pul so'rashsa — bunday bo'lmasligi kerak. Dastur operatoriga xabar bering."] }
            ]
        },
        mig_help: {
            ru: [
                { head: '🤝 Проблема на ферме', text: ['Сначала поговорите с менеджером фермы или с оператором программы.'] },
                { head: '🆘 Принуждение и эксплуатация', text: ['Горячая линия Великобритании Modern Slavery & Exploitation Helpline.'], btns: [{ label: '📞 08000 121 700', href: 'tel:08000121700', main: true }] },
                emb('ru'),
                { head: '🚨 Экстренная помощь в Великобритании', text: ['Полиция, скорая, пожарные — 999.'], btns: [{ label: '📞 999', href: 'tel:999' }] }
            ],
            tg: [
                { head: '🤝 Мушкил дар ферма', text: ['Аввал бо мудири ферма ё оператори барнома гап занед.'] },
                { head: '🆘 Маҷбуркунӣ ва истисмор', text: ['Хати боварии Британия — Modern Slavery & Exploitation Helpline.'], btns: [{ label: '📞 08000 121 700', href: 'tel:08000121700', main: true }] },
                emb('tg'),
                { head: '🚨 Ёрии фаврӣ дар Британия', text: ['Пулис, ёрии таъҷилӣ, сӯхторнишонҳо — 999.'], btns: [{ label: '📞 999', href: 'tel:999' }] }
            ],
            uz: [
                { head: '🤝 Fermada muammo', text: ["Avval ferma menejeri yoki dastur operatori bilan gaplashing."] },
                { head: '🆘 Majburlash va ekspluatatsiya', text: ['Britaniya ishonch telefoni — Modern Slavery & Exploitation Helpline.'], btns: [{ label: '📞 08000 121 700', href: 'tel:08000121700', main: true }] },
                emb('uz'),
                { head: '🚨 Britaniyada shoshilinch yordam', text: ["Politsiya, tez yordam, o't o'chiruvchilar — 999."], btns: [{ label: '📞 999', href: 'tel:999' }] }
            ]
        }
    },
    kr: {
        mig_docs: {
            ru: [
                { head: '📝 Регистрация на EPS-TOPIK', text: ['Регистрацию ведёт Агентство по трудоустройству за рубежом при Минтруде: Душанбе, ул. Лохути, 80. Даты объявляют заранее.', 'Возраст — 18–39 лет. Без судимости, инфекционных болезней и депортации из Кореи.', 'Данные — латиницей, точно как в загранпаспорте: из-за ошибки могут не допустить к экзамену или не дать визу.', 'Нужны номер телефона, электронная копия загранпаспорта и цветное фото 3,5×4,5 см на белом фоне. Экзамен — 330 сомони.'], btns: krBtns() },
                { head: '📘 Экзамен и виза', text: ['EPS-TOPIK: 40 вопросов, 50 минут, результат действует 2 года.', 'Работодатель выбирает из списка кандидатов — самому выбрать нельзя. Виза E-9 привязана к работодателю.', 'В Корее оформите карту иностранца (ARC) в течение 90 дней.'] }
            ],
            tg: [
                { head: '📝 Бақайдгирӣ ба EPS-TOPIK', text: ['Бақайдгириро Агентии шуғл дар хориҷа назди Вазорати меҳнат мебарад: Душанбе, кӯчаи Лоҳутӣ, 80. Санаҳоро пешакӣ эълон мекунанд.', 'Синну сол — 18–39. Бе судимӣ, бемориҳои сироятӣ ва депортатсия аз Корея.', 'Маълумот — бо ҳарфҳои лотинӣ, айнан мисли шинономаи хориҷӣ: аз сабаби хато метавонанд ба имтиҳон роҳ надиҳанд ё раводид надиҳанд.', 'Лозим: рақами телефон, нусхаи электронии шинономаи хориҷӣ ва акси рангаи 3,5×4,5 см дар заминаи сафед. Имтиҳон — 330 сомонӣ.'], btns: krBtns() },
                { head: '📘 Имтиҳон ва раводид', text: ['EPS-TOPIK: 40 савол, 50 дақиқа, натиҷа 2 сол эътибор дорад.', 'Корфармо аз рӯйхати номзадҳо интихоб мекунад — худатон интихоб карда наметавонед. Раводиди E-9 ба корфармо вобаста аст.', 'Дар Корея дар давоми 90 рӯз кортаи хориҷӣ (ARC) гиред.'] }
            ],
            uz: [
                { head: "📝 EPS-TOPIK ga ro'yxatdan o'tish", text: ["Ro'yxatni Mehnat vazirligi huzuridagi Chet elda bandlik agentligi olib boradi: Dushanbe, Lohutiy ko'chasi, 80. Sanalar oldindan e'lon qilinadi.", "Yosh — 18–39. Sudlanmagan, yuqumli kasalliksiz va Koreyadan deportatsiya qilinmagan bo'lish kerak.", "Ma'lumotlar — lotin harflarida, xorijiy pasportdagidek aniq: xato tufayli imtihonga qo'yilmasligi yoki viza berilmasligi mumkin.", "Kerak: telefon raqami, xorijiy pasportning elektron nusxasi va oq fonda 3,5×4,5 sm rangli surat. Imtihon — 330 somoniy."], btns: krBtns() },
                { head: '📘 Imtihon va viza', text: ["EPS-TOPIK: 40 savol, 50 daqiqa, natija 2 yil amal qiladi.", "Ish beruvchi nomzodlar ro'yxatidan tanlaydi — o'zingiz tanlay olmaysiz. E-9 vizasi ish beruvchiga bog'langan.", "Koreyada 90 kun ichida chet ellik kartasini (ARC) rasmiylashtiring."] }
            ]
        },
        mig_work: {
            ru: [
                { head: '🏭 Работа по программе EPS', text: ['Отрасли: производство, строительство, сельское хозяйство, переработка продуктов.', 'По визе E-9 можно работать до 4 лет 10 месяцев. Сменить работодателя можно только в установленных законом случаях.'], btns: krBtns() },
                { head: '🛡 Осторожно', text: ['Плата посредникам за трудоустройство запрещена и в Корее, и дома. Законно платят только за экзамен, медосмотр, паспорт и билет.', 'Кто просит деньги за «гарантию» работы или помощь с экзаменом — мошенник.'] }
            ],
            tg: [
                { head: '🏭 Кор тибқи барномаи EPS', text: ['Соҳаҳо: истеҳсолот, сохтмон, кишоварзӣ, коркарди маҳсулот.', 'Бо раводиди E-9 то 4 солу 10 моҳ кор кардан мумкин аст. Корфарморо танҳо дар ҳолатҳои муқаррарнамудаи қонун иваз кардан мумкин аст.'], btns: krBtns() },
                { head: '🛡 Эҳтиёт шавед', text: ['Пардохт ба миёнаравҳо барои ба кор ҷойгиршавӣ ҳам дар Корея ва ҳам дар ватан манъ аст. Қонунан танҳо барои имтиҳон, муоинаи тиббӣ, шиноснома ва чипта пардохт мекунанд.', 'Касе ки барои «кафолати» кор ё ёрӣ дар имтиҳон пул мехоҳад — қаллоб аст.'] }
            ],
            uz: [
                { head: '🏭 EPS dasturi bo\'yicha ish', text: ["Sohalar: ishlab chiqarish, qurilish, qishloq xo'jaligi, mahsulotlarni qayta ishlash.", "E-9 vizasi bilan 4 yil 10 oygacha ishlash mumkin. Ish beruvchini faqat qonunda belgilangan hollarda almashtirish mumkin."], btns: krBtns() },
                { head: "🛡 Ehtiyot bo'ling", text: ["Ishga joylashish uchun vositachilarga to'lov Koreyada ham, vatanda ham taqiqlangan. Qonuniy ravishda faqat imtihon, tibbiy ko'rik, pasport va chipta uchun to'lanadi.", "Ish «kafolati» yoki imtihonda yordam uchun pul so'ragan — firibgar."] }
            ]
        },
        mig_home: {
            ru: [
                { head: '🏠 Жильё', text: ['Перед подписанием трудового договора уточните, даёт ли работодатель жильё и сколько оно стоит.', 'В течение 90 дней после приезда оформите карту иностранца (ARC).'] },
                RENT.ru
            ],
            tg: [
                { head: '🏠 Манзил', text: ['Пеш аз имзои шартномаи меҳнатӣ бипурсед, ки корфармо манзил медиҳад ё не ва нархаш чанд аст.', 'Дар давоми 90 рӯзи баъди омадан кортаи хориҷӣ (ARC) гиред.'] },
                RENT.tg
            ],
            uz: [
                { head: '🏠 Uy-joy', text: ["Mehnat shartnomasini imzolashdan oldin ish beruvchi uy-joy beradimi va u qancha turishini aniqlang.", "Kelganingizdan keyin 90 kun ichida chet ellik kartasini (ARC) rasmiylashtiring."] },
                RENT.uz
            ]
        },
        mig_help: {
            ru: [
                { head: '📞 Агентство по трудоустройству за рубежом', text: ['Душанбе, ул. Лохути, 80. Номер +992 93 093 49 94 есть и в WhatsApp, и в Telegram.'], btns: krBtns() },
                { head: '☎️ Справочная для иностранцев — 1345', text: ['Многоязычный контакт-центр иммиграционной службы Кореи.'], btns: [{ label: '📞 1345', href: 'tel:1345' }] },
                emb('ru'),
                { head: '🚨 Экстренная помощь в Корее', text: ['Полиция — 112, пожарные и скорая — 119.'], btns: [{ label: '📞 112', href: 'tel:112' }, { label: '📞 119', href: 'tel:119' }] }
            ],
            tg: [
                { head: '📞 Агентии шуғл дар хориҷа', text: ['Душанбе, кӯчаи Лоҳутӣ, 80. Рақами +992 93 093 49 94 дар WhatsApp ва Telegram ҳам ҳаст.'], btns: krBtns() },
                { head: '☎️ Хадамоти маълумот барои хориҷиён — 1345', text: ['Маркази бисёрзабонаи тамоси хадамоти муҳоҷирати Корея.'], btns: [{ label: '📞 1345', href: 'tel:1345' }] },
                emb('tg'),
                { head: '🚨 Ёрии фаврӣ дар Корея', text: ['Пулис — 112, сӯхторнишонҳо ва ёрии таъҷилӣ — 119.'], btns: [{ label: '📞 112', href: 'tel:112' }, { label: '📞 119', href: 'tel:119' }] }
            ],
            uz: [
                { head: '📞 Chet elda bandlik agentligi', text: ["Dushanbe, Lohutiy ko'chasi, 80. +992 93 093 49 94 raqami WhatsApp va Telegramda ham bor."], btns: krBtns() },
                { head: "☎️ Chet elliklar uchun ma'lumot xizmati — 1345", text: ["Koreya immigratsiya xizmatining ko'p tilli aloqa markazi."], btns: [{ label: '📞 1345', href: 'tel:1345' }] },
                emb('uz'),
                { head: '🚨 Koreyada shoshilinch yordam', text: ["Politsiya — 112, o't o'chiruvchilar va tez yordam — 119."], btns: [{ label: '📞 112', href: 'tel:112' }, { label: '📞 119', href: 'tel:119' }] }
            ]
        }
    }
};

const MIG_COUNTRIES = ['ru', 'kz', 'gb', 'kr'];
function migCountry(v) { return MIG_COUNTRIES.includes(v) ? v : 'ru'; }

module.exports = { MIG_COUNTRY_GUIDES, MIG_COUNTRIES, migCountry };
