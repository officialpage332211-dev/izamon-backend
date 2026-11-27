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

// ---------- Этап 2 (27.11.2026): Турция, ОАЭ, Катар, Германия ----------
// Турция — безвиз для граждан Таджикистана отменён 05.04.2024 (Известия, 06.04.2024); виза: предзаявка и запись на visa.gov.tr,
//   подача лично в посольстве Турции в Душанбе, не позже чем за месяц, паспорт ≥6 мес. и 2 чистые страницы, $60 однократная /
//   $190 многократная, только наличными в долларах, не возвращается; любая виза — не более 90 дней из 180; виза не даёт права
//   работать, рабочая виза — в стране гражданства: трудовой договор, документы работодателя, дольше рассматривается; штрафы за
//   нарушение визы — только в пунктах оплаты в аэропорту (памятка посольства Турции в Душанбе, dushanbe-emb.mfa.gov.tr);
//   разрешение на работу считается видом на жительство (Göç İdaresi, «Yabancı ikamet izni»); YİMER 157 — 24/7, в т.ч. русский
//   и персидский (Daily Sabah, 22.08.2024).
// ОАЭ — предложение о работе (offer letter) от MoHRE, проверка по номеру на сайте MoHRE; после подписи работодатель присылает
//   электронное разрешение на въезд; расходы на найм несёт работодатель; туристическая виза не даёт права работать; ВНЖ не
//   оформляется вне ОАЭ; разрешения Дубая — GDRFA, других эмиратов — ICP; MoHRE +971 6 802 7666 (u.ae «Tips to avoid labour and
//   visa fraud», 06.10.2025); сборы с работника запрещены, паспорт забирать запрещено, WPS, жалобы — 80084 бесплатно
//   (u.ae «Labour rights», 15.10.2026); запрет на новое разрешение на работу на 1 год по жалобе о побеге, проверка — 600590000,
//   8:00–20:00 (u.ae, «Banning the issuance of a new work permit»); Ejari — регистрация договора аренды в Дубае, 177,75 AED
//   через Dubai REST / сайт DLD (dubailand.gov.ae, 19.11.2026); 999 полиция, 998 скорая.
// Катар — безвизовый въезд граждан Таджикистана на 30 дней (Ховар, 16.02.2024); вакансии через Службу миграции на 2025 год:
//   животноводство, стройка, склады, гостиницы, от $600, английский, без судимости, 20–38 лет, работодатель оплачивает билет,
//   визу, жильё, питание, лечение (Asia-Plus, 25.12.2024); минимальная зарплата 1 000 QAR + 500 жильё + 300 питание (или
//   натурой), смена работы без NOC, выездные разрешения отменены, WPS, 11 киосков жалоб на 11 языках (Правительство Катара, gco.gov.qa);
//   поправки к закону о труде — Закон №9 от 2026 года (gov.uz, 27.07.2026); платить за трудоустройство работник не должен
//   (МОТ, 06.02.2019); 999 — экстренные службы.
// Германия — Карта шансов: 6 баллов, немецкий A1 или английский B2, 1 027 € в месяц, до 1 года, работа до 20 ч в неделю,
//   страховка ≥30 000 €, пошлина 75 € в сомони (памятка посольства Германии в Душанбе, июнь 2024); виза специалиста §18a:
//   признание диплома, предложение о работе, согласие Агентства по труду, 2–3 месяца, 75 € (памятка, апрель 2024); меморандум
//   Минтруда РТ и Баварии 30.04.2026 (Asia-Plus, 01.05.2026); экзамены TELC в Таджикистане, интерес Германии: соцработа,
//   красота, физиотерапия, грузоперевозки, машиностроение, электрика (Caspian Post, 26.11.2025); регистрация по адресу — в течение
//   2 недель с подтверждением хозяина (Wohnungsgeberbestätigung) (make-it-in-germany.com); 110 полиция, 112 скорая и пожарные.
const TR_EMB = 'https://dushanbe-emb.mfa.gov.tr/';
const TR_VISA = 'https://www.visa.gov.tr/';
const AE_FRAUD = 'https://u.ae/en/information-and-services/visa-and-emirates-id/tips-to-avoid-labour-and-visa-fraud';
const AE_RIGHTS = 'https://u.ae/en/information-and-services/jobs/Sector-of-employment/employment-in-the-private-sector/labour-rights';
const AE_EJARI = 'https://dubailand.gov.ae/en/eservices/registration-and-renewal-of-lease-application/';
const QA_EMB = 'https://dushanbe.embassy.qa/en';
const QA_GCO = 'https://www.gco.gov.qa/en/focus/labour-reform/';
const DE_EMB = 'https://duschanbe.diplo.de/';
const DE_MIIG = 'https://www.make-it-in-germany.com/en/advice-support/worldwide/tajikistan';
const tel = (n, h, main) => ({ label: '📞 ' + n, href: 'tel:' + (h || n.replace(/[^\d+]/g, '')), main: !!main });
const link = (label, href, main) => ({ label, href, main: !!main });

Object.assign(MIG_COUNTRY_GUIDES, {
    tr: {
        mig_docs: {
            ru: [
                { head: '🛂 Виза в Турцию', text: ['С апреля 2024 года гражданам Таджикистана нужна виза.', 'Заполните заявку и запишитесь на visa.gov.tr, затем подайте документы лично в посольстве Турции в Душанбе — не позже чем за месяц до поездки.', 'Паспорт — действует ещё 6 месяцев и есть 2 чистые страницы. Виза: $60 однократная, $190 многократная — только наличными в долларах, при отказе не возвращается.'], btns: [link('🌐 visa.gov.tr', TR_VISA, true), link('🏛 Посольство Турции в Душанбе', TR_EMB)] },
                { head: '📅 Сколько можно находиться', text: ['По любой визе — не больше 90 дней за 180 дней. Дольше — нужен вид на жительство в Турции.'] },
                { head: '🛡 Осторожно', text: ['Обычная виза не даёт права работать. Для работы нужна рабочая виза.'] }
            ],
            tg: [
                { head: '🛂 Раводид ба Туркия', text: ['Аз апрели 2024 ба шаҳрвандони Тоҷикистон раводид лозим аст.', 'Дар visa.gov.tr ариза пур кунед ва навбат гиред, баъд ҳуҷҷатҳоро шахсан дар сафорати Туркия дар Душанбе супоред — на дертар аз як моҳ пеш аз сафар.', 'Шиноснома — боз 6 моҳ эътибор дорад ва 2 саҳифаи холӣ ҳаст. Раводид: $60 якдафъаина, $190 бисёрдафъаина — танҳо нақд бо доллар, ҳангоми рад баргардонида намешавад.'], btns: [link('🌐 visa.gov.tr', TR_VISA, true), link('🏛 Сафорати Туркия дар Душанбе', TR_EMB)] },
                { head: '📅 Чанд вақт мондан мумкин', text: ['Бо ҳар раводид — на зиёда аз 90 рӯз дар 180 рӯз. Зиёдтар — иҷозати истиқомат дар Туркия лозим аст.'] },
                { head: '🛡 Эҳтиёт шавед', text: ['Раводиди оддӣ ҳуқуқи кор намедиҳад. Барои кор раводиди корӣ лозим аст.'] }
            ],
            uz: [
                { head: '🛂 Turkiyaga viza', text: ["2024-yil apreldan Tojikiston fuqarolariga viza kerak.", "visa.gov.tr saytida ariza to'ldiring va navbat oling, so'ng hujjatlarni Turkiyaning Dushanbedagi elchixonasiga shaxsan topshiring — safardan kamida bir oy oldin.", "Pasport — yana 6 oy amal qiladi va 2 ta bo'sh sahifa bor. Viza: $60 bir martalik, $190 ko'p martalik — faqat naqd dollarda, rad etilsa qaytarilmaydi."], btns: [link('🌐 visa.gov.tr', TR_VISA, true), link('🏛 Turkiyaning Dushanbedagi elchixonasi', TR_EMB)] },
                { head: "📅 Qancha qolish mumkin", text: ["Har qanday viza bilan — 180 kun ichida 90 kundan ko'p emas. Ko'proq — Turkiyada yashash ruxsati kerak."] },
                { head: "🛡 Ehtiyot bo'ling", text: ["Oddiy viza ishlash huquqini bermaydi. Ishlash uchun ishchi viza kerak."] }
            ]
        },
        mig_work: {
            ru: [
                { head: '📄 Рабочая виза', text: ['Подаётся в своей стране — в посольстве Турции в Душанбе.', 'Нужны: трудовой договор, подписанный работодателем, и документы его компании (выписка из торгового реестра). Если работодатель — частное лицо, — его выписки из банка за 6 месяцев.', 'Рабочие визы рассматривают дольше остальных.'], btns: [link('🏛 Посольство Турции в Душанбе', TR_EMB, true)] },
                { head: '🤝 Через Минтруд Таджикистана', text: [FREE_INFO.ru], btns: [agencyBtn('ru')] },
                NO_MIDDLE.ru
            ],
            tg: [
                { head: '📄 Раводиди корӣ', text: ['Дар кишвари худ — дар сафорати Туркия дар Душанбе супорида мешавад.', 'Лозим: шартномаи меҳнатӣ бо имзои корфармо ва ҳуҷҷатҳои ширкати ӯ (иқтибос аз феҳристи тиҷоратӣ). Агар корфармо шахси хусусӣ бошад — иқтибосҳои бонкии ӯ барои 6 моҳ.', 'Раводидҳои кориро нисбат ба дигарҳо дертар баррасӣ мекунанд.'], btns: [link('🏛 Сафорати Туркия дар Душанбе', TR_EMB, true)] },
                { head: '🤝 Тавассути Вазорати меҳнат', text: [FREE_INFO.tg], btns: [agencyBtn('tg')] },
                NO_MIDDLE.tg
            ],
            uz: [
                { head: '📄 Ishchi viza', text: ["O'z mamlakatingizda — Turkiyaning Dushanbedagi elchixonasida topshiriladi.", "Kerak: ish beruvchi imzolagan mehnat shartnomasi va uning kompaniyasi hujjatlari (savdo reyestridan ko'chirma). Ish beruvchi xususiy shaxs bo'lsa — uning 6 oylik bank ko'chirmalari.", "Ishchi vizalar boshqalarga qaraganda uzoqroq ko'rib chiqiladi."], btns: [link('🏛 Turkiyaning Dushanbedagi elchixonasi', TR_EMB, true)] },
                { head: '🤝 Tojikiston Mehnat vazirligi orqali', text: [FREE_INFO.uz], btns: [agencyBtn('uz')] },
                NO_MIDDLE.uz
            ]
        },
        mig_home: {
            ru: [
                { head: '🏠 Вид на жительство', text: ['Живёте в Турции дольше 90 дней — нужен вид на жительство (икамет) от Миграционной службы Турции.', 'Разрешение на работу в Турции одновременно считается видом на жительство.'] },
                RENT.ru
            ],
            tg: [
                { head: '🏠 Иҷозати истиқомат', text: ['Дар Туркия зиёда аз 90 рӯз зиндагӣ мекунед — иҷозати истиқомат (икамет) аз Хадамоти муҳоҷирати Туркия лозим аст.', 'Иҷозати кор дар Туркия ҳамзамон иҷозати истиқомат ҳисоб меёбад.'] },
                RENT.tg
            ],
            uz: [
                { head: '🏠 Yashash ruxsati', text: ["Turkiyada 90 kundan ortiq yashasangiz — Turkiya Migratsiya xizmatidan yashash ruxsati (ikamet) kerak.", "Turkiyadagi ishlash ruxsati bir vaqtda yashash ruxsati hisoblanadi."] },
                RENT.uz
            ]
        },
        mig_help: {
            ru: [
                { head: '☎️ Справочная для иностранцев — 157', text: ['Круглосуточно. Есть русский и персидский языки. Помогает и в беде: торговля людьми, насилие.'], btns: [tel('157', '157', true)] },
                emb('ru'), sms('ru'),
                { head: '🚨 Экстренная помощь в Турции', text: ['Единый номер экстренных служб — 112.'], btns: [tel('112')] }
            ],
            tg: [
                { head: '☎️ Хадамоти маълумот барои хориҷиён — 157', text: ['Шабонарӯзӣ. Забонҳои русӣ ва форсӣ ҳаст. Дар мушкилот ҳам ёрӣ медиҳад: савдои одамон, зӯроварӣ.'], btns: [tel('157', '157', true)] },
                emb('tg'), sms('tg'),
                { head: '🚨 Ёрии фаврӣ дар Туркия', text: ['Рақами ягонаи хадамоти фаврӣ — 112.'], btns: [tel('112')] }
            ],
            uz: [
                { head: "☎️ Chet elliklar uchun ma'lumot xizmati — 157", text: ["Kecha-kunduz. Rus va fors tillari bor. Muammoda ham yordam beradi: odam savdosi, zo'ravonlik."], btns: [tel('157', '157', true)] },
                emb('uz'), sms('uz'),
                { head: '🚨 Turkiyada shoshilinch yordam', text: ['Favqulodda xizmatlarning yagona raqami — 112.'], btns: [tel('112')] }
            ]
        }
    },
    ae: {
        mig_docs: {
            ru: [
                { head: '📄 Въезд на работу', text: ['Работодатель даёт предложение о работе (offer letter) от Министерства труда ОАЭ (MoHRE). Его номер можно проверить на сайте MoHRE.', 'После подписи работодатель присылает электронное разрешение на въезд для работы.', 'Вид на жительство оформляют только внутри ОАЭ: сначала въезжаете по разрешению и остаётесь, пока его не оформят.'], btns: [link('🌐 u.ae: как не попасть к мошенникам', AE_FRAUD, true)] },
                { head: '🔎 Проверьте разрешение', text: ['Выдано в Дубае — проверяйте на сайте GDRFA; в других эмиратах — на сайте ICP.'] },
                { head: '🛡 Осторожно', text: ['По туристической визе работать нельзя — за это штрафы и ответственность.'] }
            ],
            tg: [
                { head: '📄 Вуруд барои кор', text: ['Корфармо пешниҳоди корро (offer letter) аз Вазорати меҳнати АМА (MoHRE) медиҳад. Рақамашро дар сомонаи MoHRE санҷидан мумкин аст.', 'Баъди имзо корфармо иҷозати электронии вуруд барои корро мефиристад.', 'Иҷозати истиқоматро танҳо дар дохили АМА расмӣ мекунанд: аввал бо иҷозат ворид мешавед ва то расмӣ шудан мемонед.'], btns: [link('🌐 u.ae: аз қаллобон эҳтиёт', AE_FRAUD, true)] },
                { head: '🔎 Иҷозатро санҷед', text: ['Дар Дубай дода шудааст — дар сомонаи GDRFA санҷед; дар дигар аморатҳо — дар сомонаи ICP.'] },
                { head: '🛡 Эҳтиёт шавед', text: ['Бо раводиди сайёҳӣ кор кардан мумкин нест — ҷарима ва ҷавобгарӣ дорад.'] }
            ],
            uz: [
                { head: '📄 Ishga kirish', text: ["Ish beruvchi BAA Mehnat vazirligidan (MoHRE) ish taklifini (offer letter) beradi. Uning raqamini MoHRE saytida tekshirish mumkin.", "Imzolaganingizdan keyin ish beruvchi ishlash uchun elektron kirish ruxsatini yuboradi.", "Yashash ruxsati faqat BAA ichida rasmiylashtiriladi: avval ruxsat bilan kirasiz va u rasmiylashguncha qolasiz."], btns: [link('🌐 u.ae: firibgarlardan ehtiyot', AE_FRAUD, true)] },
                { head: '🔎 Ruxsatni tekshiring', text: ["Dubayda berilgan — GDRFA saytida tekshiring; boshqa amirliklarda — ICP saytida."] },
                { head: "🛡 Ehtiyot bo'ling", text: ["Turistik viza bilan ishlash mumkin emas — jarima va javobgarlik bor."] }
            ]
        },
        mig_work: {
            ru: [
                { head: '💼 Ваши права', text: ['Расходы на найм, дорогу и вид на жительство оплачивает работодатель. Брать за трудоустройство деньги с работника запрещено.', 'Забирать у работника паспорт запрещено.', 'Зарплата идёт через систему защиты зарплат (WPS) — не платят вовремя или полностью, обращайтесь в MoHRE.'], btns: [link('🌐 u.ae: права работника', AE_RIGHTS, true), tel('80084 (бесплатно)', '80084')] },
                { head: '⚠️ Не уходите самовольно', text: ['По жалобе работодателя о самовольном уходе могут запретить новое разрешение на работу на 1 год. Узнать свой статус — в колл-центре MoHRE 600590000 (8:00–20:00, на разных языках).'], btns: [tel('600590000')] },
                NO_MIDDLE.ru
            ],
            tg: [
                { head: '💼 Ҳуқуқҳои Шумо', text: ['Хароҷоти ҷалб, роҳ ва иҷозати истиқоматро корфармо пардохт мекунад. Аз коргар барои ба кор гирифтан пул гирифтан манъ аст.', 'Шиносномаи коргарро гирифтан манъ аст.', 'Музд тавассути низоми ҳифзи музд (WPS) меояд — сари вақт ё пурра намедиҳанд, ба MoHRE муроҷиат кунед.'], btns: [link('🌐 u.ae: ҳуқуқҳои коргар', AE_RIGHTS, true), tel('80084 (ройгон)', '80084')] },
                { head: '⚠️ Худсарона наравед', text: ['Бо шикояти корфармо дар бораи худсарона рафтан метавонанд иҷозати нави корро 1 сол манъ кунанд. Ҳолати худро дар маркази тамоси MoHRE 600590000 (8:00–20:00, бо забонҳои гуногун) фаҳмед.'], btns: [tel('600590000')] },
                NO_MIDDLE.tg
            ],
            uz: [
                { head: '💼 Huquqlaringiz', text: ["Yollash, yo'l va yashash ruxsati xarajatlarini ish beruvchi to'laydi. Ishga olish uchun ishchidan pul olish taqiqlangan.", "Ishchining pasportini olib qo'yish taqiqlangan.", "Maosh ish haqini himoya qilish tizimi (WPS) orqali keladi — o'z vaqtida yoki to'liq berilmasa, MoHRE ga murojaat qiling."], btns: [link('🌐 u.ae: ishchi huquqlari', AE_RIGHTS, true), tel('80084 (bepul)', '80084')] },
                { head: "⚠️ O'zboshimchalik bilan ketmang", text: ["Ish beruvchining o'zboshimchalik bilan ketish haqidagi shikoyati bo'yicha yangi ishlash ruxsati 1 yilga taqiqlanishi mumkin. Holatingizni MoHRE aloqa markazida bilib oling: 600590000 (8:00–20:00, turli tillarda)."], btns: [tel('600590000')] },
                NO_MIDDLE.uz
            ]
        },
        mig_home: {
            ru: [
                { head: '🏠 Аренда в Дубае (Ejari)', text: ['Договор аренды в Дубае регистрируют в системе Ejari — это делает арендатор или хозяин.', 'Через приложение Dubai REST или сайт Земельного департамента Дубая регистрация стоит 177,75 дирхама.'], btns: [link('🌐 Dubai Land Department', AE_EJARI, true)] },
                RENT.ru
            ],
            tg: [
                { head: '🏠 Иҷора дар Дубай (Ejari)', text: ['Шартномаи иҷора дар Дубай дар низоми Ejari ба қайд гирифта мешавад — иҷорагир ё соҳиби хона мекунад.', 'Тавассути барномаи Dubai REST ё сомонаи Департаменти заминии Дубай бақайдгирӣ 177,75 дирҳам аст.'], btns: [link('🌐 Dubai Land Department', AE_EJARI, true)] },
                RENT.tg
            ],
            uz: [
                { head: '🏠 Dubayda ijara (Ejari)', text: ["Dubayda ijara shartnomasi Ejari tizimida ro'yxatga olinadi — buni ijarachi yoki uy egasi qiladi.", "Dubai REST ilovasi yoki Dubay Yer departamenti sayti orqali ro'yxat 177,75 dirham turadi."], btns: [link('🌐 Dubai Land Department', AE_EJARI, true)] },
                RENT.uz
            ]
        },
        mig_help: {
            ru: [
                { head: '⚖️ Трудовые жалобы', text: ['Бесплатная линия Министерства труда ОАЭ (MoHRE) по трудовым спорам — 80084. Иски до 100 000 дирхамов работники подают без пошлины.'], btns: [tel('80084', '80084', true), tel('600590000')] },
                emb('ru'),
                { head: '🚨 Экстренная помощь в ОАЭ', text: ['Полиция — 999, скорая — 998.'], btns: [tel('999'), tel('998')] }
            ],
            tg: [
                { head: '⚖️ Шикоятҳои меҳнатӣ', text: ['Хати ройгони Вазорати меҳнати АМА (MoHRE) оид ба баҳсҳои меҳнатӣ — 80084. Даъвоҳои то 100 000 дирҳамро коргарон бе боҷ медиҳанд.'], btns: [tel('80084', '80084', true), tel('600590000')] },
                emb('tg'),
                { head: '🚨 Ёрии фаврӣ дар АМА', text: ['Пулис — 999, ёрии таъҷилӣ — 998.'], btns: [tel('999'), tel('998')] }
            ],
            uz: [
                { head: '⚖️ Mehnat shikoyatlari', text: ["BAA Mehnat vazirligining (MoHRE) mehnat nizolari bo'yicha bepul liniyasi — 80084. 100 000 dirhamgacha bo'lgan da'volarni ishchilar bojsiz beradi."], btns: [tel('80084', '80084', true), tel('600590000')] },
                emb('uz'),
                { head: '🚨 BAAda shoshilinch yordam', text: ['Politsiya — 999, tez yordam — 998.'], btns: [tel('999'), tel('998')] }
            ]
        }
    },
    qa: {
        mig_docs: {
            ru: [
                { head: '✈️ Въезд в Катар', text: ['С февраля 2024 года граждане Таджикистана могут въехать в Катар без визы и находиться там 30 дней.', 'Для работы нужен трудовой договор с работодателем в Катаре. Условия уточняйте в Службе миграции или в посольстве Катара.'], btns: [link('🏛 Посольство Катара в Душанбе', QA_EMB, true)] },
                { head: '🛡 Осторожно', text: ['Работодатель в Катаре не может держать Вас разрешением на выезд: выездные разрешения отменены.'] }
            ],
            tg: [
                { head: '✈️ Вуруд ба Қатар', text: ['Аз феврали 2024 шаҳрвандони Тоҷикистон метавонанд бе раводид ба Қатар ворид шаванд ва 30 рӯз монанд.', 'Барои кор шартномаи меҳнатӣ бо корфармо дар Қатар лозим аст. Шартҳоро дар Хадамоти муҳоҷират ё сафорати Қатар пурсед.'], btns: [link('🏛 Сафорати Қатар дар Душанбе', QA_EMB, true)] },
                { head: '🛡 Эҳтиёт шавед', text: ['Корфармо дар Қатар Шуморо бо иҷозати баромад нигоҳ дошта наметавонад: иҷозатҳои баромад бекор шудаанд.'] }
            ],
            uz: [
                { head: '✈️ Qatarga kirish', text: ["2024-yil fevraldan Tojikiston fuqarolari Qatarga vizasiz kirib, 30 kun turishi mumkin.", "Ishlash uchun Qatardagi ish beruvchi bilan mehnat shartnomasi kerak. Shartlarni Migratsiya xizmati yoki Qatar elchixonasidan aniqlang."], btns: [link('🏛 Qatarning Dushanbedagi elchixonasi', QA_EMB, true)] },
                { head: "🛡 Ehtiyot bo'ling", text: ["Qatardagi ish beruvchi sizni chiqish ruxsati bilan ushlab turolmaydi: chiqish ruxsatlari bekor qilingan."] }
            ]
        },
        mig_work: {
            ru: [
                { head: '🤝 Через Службу миграции', text: ['На 2025 год Служба миграции предлагала работу в Катаре: животноводство, стройка, автосклады, гостиницы — от $600 в месяц.', 'Требования были такие: английский язык, нет судимости, возраст 20–38 лет. Билет, визу, жильё, питание и лечение оплачивал работодатель.', FREE_INFO.ru], btns: [agencyBtn('ru'), link('🌐 Сайт migration.tj', 'https://migration.tj/')] },
                { head: '💼 Права по закону Катара', text: ['Минимальная зарплата — 1 000 риалов в месяц, плюс 500 на жильё и 300 на питание, если их не дают натурой.', 'Сменить работу можно без разрешения работодателя (NOC). Зарплата идёт через систему защиты зарплат (WPS).', 'За трудоустройство работник платить не должен.'], btns: [link('🌐 Правительство Катара: трудовая реформа', QA_GCO)] },
                NO_MIDDLE.ru
            ],
            tg: [
                { head: '🤝 Тавассути Хадамоти муҳоҷират', text: ['Барои соли 2025 Хадамоти муҳоҷират дар Қатар кор пешниҳод мекард: чорводорӣ, сохтмон, анборҳои автомобилӣ, меҳмонхонаҳо — аз $600 дар як моҳ.', 'Талабот чунин буд: забони англисӣ, судимӣ надоштан, синну сол 20–38. Чипта, раводид, манзил, хӯрок ва табобатро корфармо пардохт мекард.', FREE_INFO.tg], btns: [agencyBtn('tg'), link('🌐 Сомонаи migration.tj', 'https://migration.tj/')] },
                { head: '💼 Ҳуқуқҳо тибқи қонуни Қатар', text: ['Музди ҳадди ақал — 1 000 риёл дар як моҳ, илова 500 барои манзил ва 300 барои хӯрок, агар онҳоро дар шакли натуралӣ надиҳанд.', 'Корро бе иҷозати корфармо (NOC) иваз кардан мумкин аст. Музд тавассути низоми ҳифзи музд (WPS) меояд.', 'Барои ба кор ҷойгиршавӣ коргар набояд пул диҳад.'], btns: [link('🌐 Ҳукумати Қатар: ислоҳоти меҳнат', QA_GCO)] },
                NO_MIDDLE.tg
            ],
            uz: [
                { head: '🤝 Migratsiya xizmati orqali', text: ["2025-yil uchun Migratsiya xizmati Qatarda ish taklif qilgan: chorvachilik, qurilish, avtoomborlar, mehmonxonalar — oyiga $600 dan.", "Talablar shunday edi: ingliz tili, sudlanmagan, yosh 20–38. Chipta, viza, uy-joy, ovqat va davolanishni ish beruvchi to'lagan.", FREE_INFO.uz], btns: [agencyBtn('uz'), link('🌐 migration.tj sayti', 'https://migration.tj/')] },
                { head: "💼 Qatar qonuni bo'yicha huquqlar", text: ["Eng kam ish haqi — oyiga 1 000 rial, natura shaklida berilmasa, qo'shimcha 500 uy-joy va 300 ovqat uchun.", "Ishni ish beruvchi ruxsatisiz (NOC) almashtirish mumkin. Maosh ish haqini himoya qilish tizimi (WPS) orqali keladi.", "Ishga joylashish uchun ishchi pul to'lamasligi kerak."], btns: [link('🌐 Qatar hukumati: mehnat islohoti', QA_GCO)] },
                NO_MIDDLE.uz
            ]
        },
        mig_home: {
            ru: [
                { head: '🏠 Жильё', text: ['Жильё работодатель даёт натурой или доплачивает к минимальной зарплате 500 риалов в месяц.', 'Перед подписанием договора уточните, какой из двух вариантов у Вас.'] },
                RENT.ru
            ],
            tg: [
                { head: '🏠 Манзил', text: ['Корфармо манзилро дар шакли натуралӣ медиҳад ё ба музди ҳадди ақал моҳе 500 риёл илова мекунад.', 'Пеш аз имзои шартнома бипурсед, ки кадом аз ин ду вариант барои Шумост.'] },
                RENT.tg
            ],
            uz: [
                { head: '🏠 Uy-joy', text: ["Ish beruvchi uy-joyni natura shaklida beradi yoki eng kam ish haqiga oyiga 500 rial qo'shib to'laydi.", "Shartnomani imzolashdan oldin sizda qaysi variant ekanini aniqlang."] },
                RENT.uz
            ]
        },
        mig_help: {
            ru: [
                { head: '⚖️ Трудовые жалобы', text: ['Жалобу можно подать в электронных киосках в 11 отделениях Министерства труда Катара — на 11 языках.'], btns: [link('🌐 Правительство Катара: трудовая реформа', QA_GCO, true)] },
                emb('ru'), sms('ru'),
                { head: '🚨 Экстренная помощь в Катаре', text: ['Единый номер экстренных служб — 999.'], btns: [tel('999')] }
            ],
            tg: [
                { head: '⚖️ Шикоятҳои меҳнатӣ', text: ['Шикоятро дар киоскҳои электронӣ дар 11 шуъбаи Вазорати меҳнати Қатар — бо 11 забон додан мумкин аст.'], btns: [link('🌐 Ҳукумати Қатар: ислоҳоти меҳнат', QA_GCO, true)] },
                emb('tg'), sms('tg'),
                { head: '🚨 Ёрии фаврӣ дар Қатар', text: ['Рақами ягонаи хадамоти фаврӣ — 999.'], btns: [tel('999')] }
            ],
            uz: [
                { head: '⚖️ Mehnat shikoyatlari', text: ["Shikoyatni Qatar Mehnat vazirligining 11 ta bo'limidagi elektron kiosklarda — 11 tilda berish mumkin."], btns: [link('🌐 Qatar hukumati: mehnat islohoti', QA_GCO, true)] },
                emb('uz'), sms('uz'),
                { head: '🚨 Qatarda shoshilinch yordam', text: ['Favqulodda xizmatlarning yagona raqami — 999.'], btns: [tel('999')] }
            ]
        }
    },
    de: {
        mig_docs: {
            ru: [
                { head: '🎫 Карта шансов (поиск работы)', text: ['Нужны диплом или профобразование не меньше 2 лет и немецкий не ниже A1 или английский B2. Ещё нужно минимум 6 баллов: за признание квалификации, язык, опыт, возраст.', 'Деньги на жизнь — от 1 027 € в месяц. Карта — до 1 года, можно подрабатывать до 20 часов в неделю.', 'Нужна медстраховка на весь срок (от 30 000 €). Пошлина — 75 €, платится в сомони.'], btns: [link('🏛 Посольство Германии в Душанбе', DE_EMB, true)] },
                { head: '📄 Виза специалиста', text: ['Нужны признание диплома в Германии, предложение о работе и согласие Агентства по труду Германии.', 'Рассмотрение — 2–3 месяца. Пошлина — 75 €. Документы не на немецком — с переводом.'] }
            ],
            tg: [
                { head: '🎫 Кортаи имкониятҳо (ҷустуҷӯи кор)', text: ['Диплом ё таҳсили касбии на камтар аз 2 сол ва забони олмонӣ на камтар аз A1 ё англисӣ B2 лозим. Боз ҳадди ақал 6 хол: барои эътирофи тахассус, забон, таҷриба, синну сол.', 'Пул барои зиндагӣ — аз 1 027 € дар як моҳ. Корта — то 1 сол, то 20 соат дар ҳафта кор кардан мумкин.', 'Суғуртаи тиббӣ барои тамоми мӯҳлат (аз 30 000 €) лозим. Боҷ — 75 €, бо сомонӣ пардохт мешавад.'], btns: [link('🏛 Сафорати Олмон дар Душанбе', DE_EMB, true)] },
                { head: '📄 Раводиди мутахассис', text: ['Эътирофи диплом дар Олмон, пешниҳоди кор ва розигии Агентии меҳнати Олмон лозим аст.', 'Баррасӣ — 2–3 моҳ. Боҷ — 75 €. Ҳуҷҷатҳои на ба олмонӣ — бо тарҷума.'] }
            ],
            uz: [
                { head: '🎫 Imkoniyatlar kartasi (ish qidirish)', text: ["Diplom yoki kamida 2 yillik kasbiy ta'lim va nemis tili kamida A1 yoki ingliz B2 kerak. Yana kamida 6 ball: malakani tan olish, til, tajriba, yosh uchun.", "Yashash uchun pul — oyiga 1 027 € dan. Karta — 1 yilgacha, haftasiga 20 soatgacha ishlash mumkin.", "Butun muddatga tibbiy sug'urta (30 000 € dan) kerak. Boj — 75 €, somoniyda to'lanadi."], btns: [link('🏛 Germaniyaning Dushanbedagi elchixonasi', DE_EMB, true)] },
                { head: '📄 Mutaxassis vizasi', text: ["Germaniyada diplomni tan olish, ish taklifi va Germaniya Mehnat agentligining roziligi kerak.", "Ko'rib chiqish — 2–3 oy. Boj — 75 €. Nemis tilida bo'lmagan hujjatlar — tarjima bilan."] }
            ]
        },
        mig_work: {
            ru: [
                { head: '🤝 Сотрудничество с Германией', text: ['30 апреля 2026 года Минтруд Таджикистана и Бавария подписали меморандум о трудовой миграции молодых специалистов.', 'В Таджикистане готовят официальные экзамены по немецкому языку (TELC). Германии нужны работники в соцсфере, красоте, физиотерапии, грузоперевозках, машиностроении и электрике.'], btns: [agencyBtn('ru'), link('🌐 Make it in Germany', DE_MIIG)] },
                NO_MIDDLE.ru
            ],
            tg: [
                { head: '🤝 Ҳамкорӣ бо Олмон', text: ['30 апрели 2026 Вазорати меҳнати Тоҷикистон ва Бавария дар бораи муҳоҷирати меҳнатии мутахассисони ҷавон ёддошт имзо карданд.', 'Дар Тоҷикистон имтиҳонҳои расмии забони олмонӣ (TELC)-ро омода мекунанд. Ба Олмон коргарон дар соҳаи иҷтимоӣ, зебоӣ, физиотерапия, боркашонӣ, мошинсозӣ ва барқ лозиманд.'], btns: [agencyBtn('tg'), link('🌐 Make it in Germany', DE_MIIG)] },
                NO_MIDDLE.tg
            ],
            uz: [
                { head: '🤝 Germaniya bilan hamkorlik', text: ["2026-yil 30-aprelda Tojikiston Mehnat vazirligi va Bavariya yosh mutaxassislar mehnat migratsiyasi bo'yicha memorandum imzoladi.", "Tojikistonda nemis tili bo'yicha rasmiy imtihonlar (TELC) tayyorlanmoqda. Germaniyaga ijtimoiy soha, go'zallik, fizioterapiya, yuk tashish, mashinasozlik va elektr sohasida ishchilar kerak."], btns: [agencyBtn('uz'), link('🌐 Make it in Germany', DE_MIIG)] },
                NO_MIDDLE.uz
            ]
        },
        mig_home: {
            ru: [
                { head: '🏠 Регистрация по адресу', text: ['В течение 2 недель после заселения зарегистрируйтесь в местном бюро регистрации жителей.', 'Нужны документ, удостоверяющий личность, и подтверждение от хозяина жилья (Wohnungsgeberbestätigung). Запись часто — онлайн.'] },
                RENT.ru
            ],
            tg: [
                { head: '🏠 Бақайдгирӣ дар суроға', text: ['Дар давоми 2 ҳафтаи баъди ҷойгиршавӣ дар бюрои маҳаллии бақайдгирии сокинон ба қайд гиред.', 'Ҳуҷҷати шахсият ва тасдиқнома аз соҳиби манзил (Wohnungsgeberbestätigung) лозим. Навбат аксаран онлайн аст.'] },
                RENT.tg
            ],
            uz: [
                { head: "🏠 Manzil bo'yicha ro'yxat", text: ["Joylashganingizdan keyin 2 hafta ichida mahalliy aholini ro'yxatga olish byurosida ro'yxatdan o'ting.", "Shaxsni tasdiqlovchi hujjat va uy egasidan tasdiqnoma (Wohnungsgeberbestätigung) kerak. Navbat ko'pincha onlayn."] },
                RENT.uz
            ]
        },
        mig_help: {
            ru: [
                { head: '🏛 Посольство Германии в Душанбе', text: ['Визы и памятки по всем видам виз — на сайте посольства.'], btns: [link('🌐 duschanbe.diplo.de', DE_EMB, true)] },
                emb('ru'),
                { head: '🚨 Экстренная помощь в Германии', text: ['Полиция — 110, скорая и пожарные — 112.'], btns: [tel('110'), tel('112')] }
            ],
            tg: [
                { head: '🏛 Сафорати Олмон дар Душанбе', text: ['Раводидҳо ва ёддоштҳо оид ба ҳамаи навъҳои раводид — дар сомонаи сафорат.'], btns: [link('🌐 duschanbe.diplo.de', DE_EMB, true)] },
                emb('tg'),
                { head: '🚨 Ёрии фаврӣ дар Олмон', text: ['Пулис — 110, ёрии таъҷилӣ ва сӯхторнишонҳо — 112.'], btns: [tel('110'), tel('112')] }
            ],
            uz: [
                { head: '🏛 Germaniyaning Dushanbedagi elchixonasi', text: ["Vizalar va barcha turdagi vizalar bo'yicha eslatmalar — elchixona saytida."], btns: [link('🌐 duschanbe.diplo.de', DE_EMB, true)] },
                emb('uz'),
                { head: '🚨 Germaniyada shoshilinch yordam', text: ["Politsiya — 110, tez yordam va o't o'chiruvchilar — 112."], btns: [tel('110'), tel('112')] }
            ]
        }
    }
});


// ---------- Этап 3 (27.11.2026): Япония, Румыния. Бельгия и Китай не добавлены: меморандум с Бельгией ещё на внутреннем
// согласовании, без вакансий и порядка подачи (Asia-Plus, 04.02.2026); программ набора в Китай для граждан Таджикистана нет ----------
// Япония — «Специалист с особыми навыками» (SSW i): от 18 лет, экзамен по навыкам отрасли, японский JFT-Basic или JLPT N4,
//   договор с работодателем, работодатель получает Сертификат соответствия (CoE), с ним — виза в посольстве Японии; 16 отраслей;
//   залоги и «штрафные» договоры запрещены; после приезда — регистрация по месту жительства в муниципалитете (MOFA Japan, SSW
//   General Process); набор Службы миграции 2025: 20–39 лет, разговорный японский, отрасли, от $12 в час, жильё и 3-разовое
//   питание от работодателя, визу и билет оплачивает работник, ул. С. Айни 121, тел. 225-05-75, 225-02-21 (Asia-Plus, 24.07.2025);
//   10 граждан Таджикистана уже работают в Японии, документы — на сайте JITCO (Asia-Plus, 04.02.2026); 110 полиция, 119 пожарные и скорая.
// Румыния — с 27.04.2026 (Срочное постановление №32/2026): визы D/AM1 (квалифицированные) и D/AM2 (постоянные, сезонные), отдельное
//   разрешение на работу отменено, единая заявка, D/AM2 подают только агентства с разрешением ANOFM или уполномоченные работодатели,
//   с работника нельзя брать комиссию, обязательный трёхсторонний договор, договор на двух языках, работодатель — от 24 месяцев
//   работы и от 50 сотрудников, гарантия 1 000 € за работника, сбор за долгосрочную визу 300 €, платформа WorkinRomania.gov.ro
//   (EY Romania, 30.04.2026); вид на жительство — в отделении IGI по месту жительства, если работаете больше 90 дней, зарплата
//   не ниже минимальной (EU Immigration Portal, 01.04.2025); 112 — экстренные службы.
const JP_SSW = 'https://www.mofa.go.jp/mofaj/ca/fna/ssw/us/introduction/';
const RO_PORTAL = 'https://workinromania.gov.ro/';
const JP_SMS = [['225-05-75', 'tel:+992372250575'], ['225-02-21', 'tel:+992372250221']];
const jpBtns = () => JP_SMS.map(([l, h], i) => ({ label: '📞 ' + l, href: h, main: !i }));

Object.assign(MIG_COUNTRY_GUIDES, {
    jp: {
        mig_docs: {
            ru: [
                { head: '📘 «Специалист с особыми навыками»', text: ['Возраст — от 18 лет. Нужно сдать экзамен по навыкам своей отрасли и японский язык: JFT-Basic или JLPT N4.', 'Подписываете договор с работодателем в Японии. Он получает для Вас Сертификат соответствия (CoE), а с ним Вы подаёте на визу в посольство Японии.', 'Таких отраслей в Японии 16.'], btns: [link('🌐 МИД Японии: как оформить', JP_SSW, true)] },
                { head: '🛡 Осторожно', text: ['Залог и договоры со «штрафами» за уход запрещены. Просят залог — это нарушение.'] }
            ],
            tg: [
                { head: '📘 «Мутахассиси дорои маҳорати махсус»', text: ['Синну сол — аз 18. Имтиҳони маҳорати соҳаи худ ва забони япониро супоред: JFT-Basic ё JLPT N4.', 'Бо корфармо дар Япония шартнома мебандед. Ӯ барои Шумо Сертификати мутобиқат (CoE) мегирад ва бо он ба сафорати Япония барои раводид ариза медиҳед.', 'Чунин соҳаҳо дар Япония 16 то ҳастанд.'], btns: [link('🌐 ВКХ Япония: чӣ тавр расмӣ кардан', JP_SSW, true)] },
                { head: '🛡 Эҳтиёт шавед', text: ['Гарав ва шартномаҳо бо «ҷарима» барои рафтан манъ аст. Гарав мехоҳанд — ин вайронкорӣ аст.'] }
            ],
            uz: [
                { head: "📘 «Maxsus ko'nikmali mutaxassis»", text: ["Yosh — 18 dan. O'z sohangiz bo'yicha ko'nikma imtihoni va yapon tilini topshirasiz: JFT-Basic yoki JLPT N4.", "Yaponiyadagi ish beruvchi bilan shartnoma tuzasiz. U siz uchun Muvofiqlik sertifikatini (CoE) oladi, u bilan Yaponiya elchixonasiga vizaga topshirasiz.", "Bunday sohalar Yaponiyada 16 ta."], btns: [link('🌐 Yaponiya TIV: qanday rasmiylashtirish', JP_SSW, true)] },
                { head: "🛡 Ehtiyot bo'ling", text: ["Garov va ketish uchun «jarima»li shartnomalar taqiqlangan. Garov so'rashsa — bu qoidabuzarlik."] }
            ]
        },
        mig_work: {
            ru: [
                { head: '🤝 Через Службу миграции', text: ['В 2025 году Служба миграции набирала людей на работу в Японии: производство, стройка, судостроение, транспорт, авиация, железная дорога, рыболовство, сельское и лесное хозяйство.', 'Требования были такие: 20–39 лет, без судимости, разговорный японский. Оплата — от $12 в час, жильё и трёхразовое питание даёт работодатель, визу и билет оплачивает работник.', 'По итогам 2025 года в Японии уже работают 10 граждан Таджикистана.'], btns: jpBtns() },
                NO_MIDDLE.ru
            ],
            tg: [
                { head: '🤝 Тавассути Хадамоти муҳоҷират', text: ['Соли 2025 Хадамоти муҳоҷират барои кор дар Япония одам ҷалб мекард: истеҳсолот, сохтмон, киштисозӣ, нақлиёт, ҳавопаймоӣ, роҳи оҳан, моҳигирӣ, кишоварзӣ ва хоҷагии ҷангал.', 'Талабот чунин буд: 20–39 сола, бе судимӣ, забони гуфтугӯии японӣ. Музд — аз $12 дар як соат, манзил ва хӯроки серуза аз корфармо, раводид ва чиптаро коргар пардохт мекунад.', 'Дар натиҷаи соли 2025 дар Япония аллакай 10 шаҳрванди Тоҷикистон кор мекунанд.'], btns: jpBtns() },
                NO_MIDDLE.tg
            ],
            uz: [
                { head: '🤝 Migratsiya xizmati orqali', text: ["2025-yilda Migratsiya xizmati Yaponiyada ishlash uchun odam yollagan: ishlab chiqarish, qurilish, kemasozlik, transport, aviatsiya, temir yo'l, baliqchilik, qishloq va o'rmon xo'jaligi.", "Talablar shunday edi: 20–39 yosh, sudlanmagan, so'zlashuv darajasida yapon tili. Maosh — soatiga $12 dan, uy-joy va uch mahal ovqatni ish beruvchi beradi, viza va chiptani ishchi to'laydi.", "2025-yil yakunlariga ko'ra Yaponiyada allaqachon 10 nafar Tojikiston fuqarosi ishlamoqda."], btns: jpBtns() },
                NO_MIDDLE.uz
            ]
        },
        mig_home: {
            ru: [
                { head: '🏠 После приезда', text: ['Зарегистрируйтесь по месту жительства в мэрии своего города, откройте счёт для зарплаты и оформите жильё.', 'В наборе Службы миграции 2025 года жильё давал работодатель — уточните это в договоре до подписи.'] },
                RENT.ru
            ],
            tg: [
                { head: '🏠 Баъди омадан', text: ['Дар мэрияи шаҳри худ дар ҷои зист ба қайд гиред, барои музд суратҳисоб кушоед ва манзилро расмӣ кунед.', 'Дар ҷалби Хадамоти муҳоҷирати соли 2025 манзилро корфармо медод — инро пеш аз имзо дар шартнома аниқ кунед.'] },
                RENT.tg
            ],
            uz: [
                { head: '🏠 Kelganingizdan keyin', text: ["Shahringiz meriyasida yashash joyi bo'yicha ro'yxatdan o'ting, maosh uchun hisob oching va uy-joyni rasmiylashtiring.", "Migratsiya xizmatining 2025-yilgi yollashida uy-joyni ish beruvchi bergan — buni imzolashdan oldin shartnomada aniqlang."] },
                RENT.uz
            ]
        },
        mig_help: {
            ru: [
                { head: '🏢 Служба миграции — набор в Японию', text: ['Душанбе, ул. С. Айни, 121.'], btns: jpBtns() },
                emb('ru'),
                { head: '🚨 Экстренная помощь в Японии', text: ['Полиция — 110, пожарные и скорая — 119.'], btns: [tel('110'), tel('119')] }
            ],
            tg: [
                { head: '🏢 Хадамоти муҳоҷират — ҷалб ба Япония', text: ['Душанбе, кӯчаи С. Айнӣ, 121.'], btns: jpBtns() },
                emb('tg'),
                { head: '🚨 Ёрии фаврӣ дар Япония', text: ['Пулис — 110, сӯхторнишонҳо ва ёрии таъҷилӣ — 119.'], btns: [tel('110'), tel('119')] }
            ],
            uz: [
                { head: '🏢 Migratsiya xizmati — Yaponiyaga yollash', text: ["Dushanbe, S. Ayniy ko'chasi, 121."], btns: jpBtns() },
                emb('uz'),
                { head: '🚨 Yaponiyada shoshilinch yordam', text: ["Politsiya — 110, o't o'chiruvchilar va tez yordam — 119."], btns: [tel('110'), tel('119')] }
            ]
        }
    },
    ro: {
        mig_docs: {
            ru: [
                { head: '🛂 Рабочая виза (с 27 апреля 2026 года)', text: ['Новые визы: D/AM1 — для квалифицированных работников, D/AM2 — для постоянной и сезонной работы.', 'Отдельного разрешения на работу больше нет: подаётся одна общая заявка. По D/AM2 её подаёт только агентство с разрешением или уполномоченный работодатель.', 'Сбор за долгосрочную визу — 300 €. Заявки идут через платформу WorkinRomania.gov.ro.'], btns: [link('🌐 WorkinRomania.gov.ro', RO_PORTAL, true)] },
                { head: '🏠 После въезда', text: ['Работаете больше 90 дней — оформите вид на жительство в отделении Иммиграционной службы Румынии (IGI) по месту жительства.'] }
            ],
            tg: [
                { head: '🛂 Раводиди корӣ (аз 27 апрели 2026)', text: ['Раводидҳои нав: D/AM1 — барои коргарони баландихтисос, D/AM2 — барои кори доимӣ ва мавсимӣ.', 'Иҷозати алоҳидаи кор дигар нест: як аризаи умумӣ дода мешавад. Барои D/AM2 онро танҳо агентии иҷозатдор ё корфармои ваколатдор медиҳад.', 'Пардохт барои раводиди дарозмуддат — 300 €. Аризаҳо тавассути платформаи WorkinRomania.gov.ro мегузаранд.'], btns: [link('🌐 WorkinRomania.gov.ro', RO_PORTAL, true)] },
                { head: '🏠 Баъди вуруд', text: ['Зиёда аз 90 рӯз кор мекунед — дар шуъбаи Хадамоти муҳоҷирати Руминия (IGI) дар ҷои зист иҷозати истиқомат гиред.'] }
            ],
            uz: [
                { head: '🛂 Ishchi viza (2026-yil 27-apreldan)', text: ["Yangi vizalar: D/AM1 — malakali ishchilar uchun, D/AM2 — doimiy va mavsumiy ish uchun.", "Alohida ishlash ruxsati endi yo'q: bitta umumiy ariza beriladi. D/AM2 bo'yicha uni faqat ruxsatli agentlik yoki vakolatli ish beruvchi beradi.", "Uzoq muddatli viza yig'imi — 300 €. Arizalar WorkinRomania.gov.ro platformasi orqali o'tadi."], btns: [link('🌐 WorkinRomania.gov.ro', RO_PORTAL, true)] },
                { head: '🏠 Kirgandan keyin', text: ["90 kundan ortiq ishlasangiz — yashash joyingizdagi Ruminiya Immigratsiya xizmati (IGI) bo'limida yashash ruxsatini oling."] }
            ]
        },
        mig_work: {
            ru: [
                { head: '🏢 Только через агентства с разрешением', text: ['Агентство по трудоустройству должно иметь разрешение Национального агентства занятости Румынии (ANOFM).', 'С работника нельзя брать комиссию или любую плату. Обязателен договор трёх сторон: агентство, работодатель и Вы.', 'Трудовой договор — на румынском и на понятном Вам языке. Зарплата — не ниже минимальной в Румынии.'] },
                { head: '🔎 Проверьте работодателя', text: ['Работодатель по визе D/AM2 должен работать не меньше 24 месяцев, иметь не меньше 50 сотрудников и внести гарантию 1 000 € за каждого иностранного работника.'] },
                NO_MIDDLE.ru
            ],
            tg: [
                { head: '🏢 Танҳо тавассути агентиҳои иҷозатдор', text: ['Агентии ба кор ҷойгиркунӣ бояд иҷозати Агентии миллии шуғли Руминия (ANOFM)-ро дошта бошад.', 'Аз коргар комиссия ё ягон пардохт гирифтан мумкин нест. Шартномаи се тараф ҳатмист: агентӣ, корфармо ва Шумо.', 'Шартномаи меҳнатӣ — бо забони руминӣ ва забоне, ки Шумо мефаҳмед. Музд — на камтар аз ҳадди ақал дар Руминия.'] },
                { head: '🔎 Корфарморо санҷед', text: ['Корфармо барои раводиди D/AM2 бояд на камтар аз 24 моҳ кор карда бошад, на камтар аз 50 корманд дошта бошад ва барои ҳар коргари хориҷӣ 1 000 € кафолат гузорад.'] },
                NO_MIDDLE.tg
            ],
            uz: [
                { head: '🏢 Faqat ruxsatli agentliklar orqali', text: ["Ishga joylashtirish agentligida Ruminiya Milliy bandlik agentligi (ANOFM) ruxsati bo'lishi kerak.", "Ishchidan komissiya yoki har qanday to'lov olish mumkin emas. Uch tomonlama shartnoma majburiy: agentlik, ish beruvchi va siz.", "Mehnat shartnomasi — rumin tilida va siz tushunadigan tilda. Maosh — Ruminiyadagi eng kam ish haqidan kam emas."] },
                { head: '🔎 Ish beruvchini tekshiring', text: ["D/AM2 vizasi bo'yicha ish beruvchi kamida 24 oy faoliyat yuritgan, kamida 50 xodimga ega bo'lishi va har bir chet ellik ishchi uchun 1 000 € kafolat qo'yishi kerak."] },
                NO_MIDDLE.uz
            ]
        },
        mig_home: {
            ru: [
                { head: '🏠 Вид на жительство', text: ['Работаете в Румынии больше 90 дней — нужен вид на жительство: его оформляют в отделении IGI там, где Вы живёте.'] },
                RENT.ru
            ],
            tg: [
                { head: '🏠 Иҷозати истиқомат', text: ['Дар Руминия зиёда аз 90 рӯз кор мекунед — иҷозати истиқомат лозим: онро дар шуъбаи IGI дар ҷое, ки зиндагӣ мекунед, расмӣ мекунанд.'] },
                RENT.tg
            ],
            uz: [
                { head: '🏠 Yashash ruxsati', text: ["Ruminiyada 90 kundan ortiq ishlasangiz — yashash ruxsati kerak: u yashayotgan joyingizdagi IGI bo'limida rasmiylashtiriladi."] },
                RENT.uz
            ]
        },
        mig_help: {
            ru: [emb('ru'), sms('ru'),
                { head: '🚨 Экстренная помощь в Румынии', text: ['Единый номер экстренных служб — 112.'], btns: [tel('112')] }],
            tg: [emb('tg'), sms('tg'),
                { head: '🚨 Ёрии фаврӣ дар Руминия', text: ['Рақами ягонаи хадамоти фаврӣ — 112.'], btns: [tel('112')] }],
            uz: [emb('uz'), sms('uz'),
                { head: '🚨 Ruminiyada shoshilinch yordam', text: ['Favqulodda xizmatlarning yagona raqami — 112.'], btns: [tel('112')] }]
        }
    }
});


const MIG_COUNTRIES = ['ru', 'kz', 'gb', 'kr', 'tr', 'ae', 'qa', 'de', 'jp', 'ro'];
function migCountry(v) { return MIG_COUNTRIES.includes(v) ? v : 'ru'; }

module.exports = { MIG_COUNTRY_GUIDES, MIG_COUNTRIES, migCountry };
