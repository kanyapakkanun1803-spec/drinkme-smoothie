/**
 * DrinkMe Beverage Data & Menu Definitions
 * 4 menus according to user specifications and design mockup:
 * 1. Avocado Smoothie (Cow Milk) - 130 THB
 * 2. Avocado Smoothie (Oat Milk / Healthy) - 145 THB
 * 3. Mix Berry (Real Fruit Juice 4 Berries) - 130 THB
 * 4. Mix Berry (4 Berries + Yogurt) - 145 THB
 */

const DRINK_MENUS = [
    {
        id: "avocado-cow-milk",
        nameEn: "Avocado Smoothie",
        editionEn: "Classic Cow Milk",
        nameTh: "อะโวคาโด สมูทตี้ (นมโคสดคุณภาพ)",
        price: 130,
        volume: "330 ml",
        tagType: "sun", // Sun icon neck tag
        tagText: "FRESH SUNSHINE",
        theme: {
            primary: "#5e8c31",
            secondary: "#e0d3be",
            accent: "#d4a373",
            bgGradient: "radial-gradient(circle at 50% 40%, #fdfbf7 0%, #f3ece2 45%, #e6d8c4 100%)",
            liquidColor: "linear-gradient(180deg, #d4e79e 0%, #b8d96f 40%, #9bc648 100%)",
            liquidWave: "#94c243",
            labelBg: "#ebd7be",
            labelText: "#4a2c17",
            badgeBg: "#4a2c17",
            cardGlow: "rgba(94, 140, 49, 0.25)"
        },
        badge: "100% Real Fruit • Farm Fresh",
        highlight: "สูตรคลาสสิก นุ่มมันกลมกล่อม",
        description: "ความละมุนจากอะโวคาโดพันธุ์แฮสสด ผสานนมโคสดคุณภาพสูงจากฟาร์มโคนมชั้นเลิศ รสสัมผัสเนียนนุ่ม หอมมันธรรมชาติอย่างลงตัว ให้พลังงานสะอาดเพื่อวันสดใสของคุณ",
        ingredients: [
            {
                nameTh: "อะโวคาโดสดสายพันธุ์แฮส",
                nameEn: "Fresh Hass Avocado",
                percent: 65,
                icon: "🥑",
                benefit: "อุดมด้วยไขมันดี (HDL), วิตามิน E และโพแทสเซียม ช่วยบำรุงผิวและหัวใจ",
                source: "คัดสดจากไร่ออร์แกนิกบนดอยสูง"
            },
            {
                nameTh: "นมโคสดแท้ 100% คุณภาพเยี่ยม",
                nameEn: "Premium Farm Fresh Milk",
                percent: 30,
                icon: "🥛",
                benefit: "แคลเซียมสูง โปรตีนธรรมชาติ ช่วยเสริมสร้างกระดูกและฟัน แหล่งพลังงานบริสุทธิ์",
                source: "จากแม่โคนมพันธุ์ดี เลี้ยงด้วยหญ้าธรรมชาติ (Grass-Fed)"
            },
            {
                nameTh: "น้ำผึ้งป่าเดือนห้าหยดทอง",
                nameEn: "Wild Raw Honey",
                percent: 5,
                icon: "🍯",
                benefit: "เพิ่มความหวานละมุนอย่างอ่อนโยน เสริมภูมิคุ้มกัน และชุ่มคอ",
                source: "น้ำผึ้งธรรมชาติแท้ ไม่แต่งเติมน้ำตาลทราย"
            }
        ],
        nutrition: {
            calories: "280 kcal",
            protein: "7.2 g",
            healthyFats: "16.5 g",
            fiber: "8.0 g",
            sweetness: "35% (ความหวานธรรมชาติ)"
        },
        freshnessMetrics: {
            coolness: "88%",
            smoothness: "98%",
            energy: "90%",
            sweetnessBar: 35
        }
    },
    {
        id: "avocado-oat-milk",
        nameEn: "Avocado Smoothie",
        editionEn: "Healthy Oat Milk",
        nameTh: "อะโวคาโด สมูทตี้ (นมโอ๊ตเพื่อสุขภาพ)",
        price: 145,
        volume: "330 ml",
        tagType: "snow", // Snowflake icon neck tag
        tagText: "HEALTHY CHILL",
        theme: {
            primary: "#3a7d44",
            secondary: "#cbe3ef",
            accent: "#45969b",
            bgGradient: "radial-gradient(circle at 50% 40%, #f0f9ff 0%, #dff0fa 45%, #c5e4f3 100%)",
            liquidColor: "linear-gradient(180deg, #cbe38b 0%, #a8d562 45%, #7cb342 100%)",
            liquidWave: "#73a838",
            labelBg: "#bfdded",
            labelText: "#184563",
            badgeBg: "#184563",
            cardGlow: "rgba(58, 125, 68, 0.25)"
        },
        badge: "Plant-Based • 0% Lactose • Healthy Choice",
        highlight: "สูตรเฮลท์ตี้ แคลอรีต่ำ ย่อยง่าย",
        description: "ทางเลือกใหม่ของคนรักสุขภาพ! ผสานเนื้ออะโวคาโดสดเข้มข้นเข้ากับนมโอ๊ตออร์แกนิก ปราศจากแลคโตส ให้รสสัมผัสหอมกลิ่นโอ๊ตอ่อนๆ เบาสบายท้อง ดีต่อระบบขับถ่าย",
        ingredients: [
            {
                nameTh: "อะโวคาโดสดสายพันธุ์แฮส",
                nameEn: "Fresh Hass Avocado",
                percent: 65,
                icon: "🥑",
                benefit: "ไขมันดีสูง โคเลสเตอรอล 0% อิ่มนาน ชะลอความหิว และดีต่อระดับน้ำตาลในเลือด",
                source: "ผลสดคัดสรรพิเศษ อุณหภูมิควบคุมเพื่อคงคุณค่าสูงสุด"
            },
            {
                nameTh: "นมโอ๊ตออร์แกนิกคัดพิเศษ",
                nameEn: "Organic Swedish Oat Milk",
                percent: 30,
                icon: "🌾",
                benefit: "ไร้แลคโตส 100%, มีเบต้า-กลูแคน ช่วยลดคอเลสเตอรอล ย่อยง่าย ไม่ทำให้แน่นท้อง",
                source: "ข้าวโอ๊ตออร์แกนิกนำเข้า คั้นสดด้วยกรรมวิธีปลอดสารเคมี"
            },
            {
                nameTh: "น้ำเชื่อมดอกอากาเว่ & เมล็ดเจีย",
                nameEn: "Organic Agave & Chia Nectar",
                percent: 5,
                icon: "✨",
                benefit: "ค่าดัชนีน้ำตาลต่ำ (Low GI), โอเมก้า 3 สูง และไฟเบอร์ช่วยให้อยู่ท้อง",
                source: "ส่วนผสมออร์แกนิกบริสุทธิ์เพื่อสุขภาพเต็มขวด"
            }
        ],
        nutrition: {
            calories: "230 kcal",
            protein: "4.8 g",
            healthyFats: "14.0 g",
            fiber: "10.5 g",
            sweetness: "25% (Low GI)"
        },
        freshnessMetrics: {
            coolness: "95%",
            smoothness: "94%",
            energy: "85%",
            sweetnessBar: 25
        }
    },
    {
        id: "mixed-berry-classic",
        nameEn: "Mixed Berry",
        editionEn: "Pure Real Fruit Juice",
        nameTh: "มิกซ์เบอร์รี คลาสสิก (น้ำผลไม้แท้ 4 ชนิด)",
        price: 130,
        volume: "330 ml",
        tagType: "sun", // Sun & drink glass
        tagText: "TROPICAL SUNSHINE",
        theme: {
            primary: "#c2185b",
            secondary: "#ffe082",
            accent: "#ff5722",
            bgGradient: "radial-gradient(circle at 50% 40%, #fff7eb 0%, #fee6df 45%, #ffd4ca 100%)",
            liquidColor: "linear-gradient(180deg, #e91e63 0%, #ad1457 50%, #880e4f 100%)",
            liquidWave: "#790c44",
            labelBg: "linear-gradient(135deg, #ffd54f 0%, #ff8a80 50%, #ff4081 100%)",
            labelText: "#ffffff",
            badgeBg: "#ad1457",
            cardGlow: "rgba(233, 30, 99, 0.3)"
        },
        badge: "100% Real Fruit • High Vitamin C • 0% Added Sugar",
        highlight: "เปรี้ยวหวานสดชื่น จี๊ดจ๊าดปลุกพลัง",
        description: "สัมผัสความสดชื่นเต็มพิกัดจากการรวมตัวของสุดยอดผลไม้ตระกูลเบอร์รี 4 ชนิด สตรอว์เบอร์รี, บลูเบอร์รี, ราสเบอร์รี และมัลเบอร์รี เปรี้ยวอมหวานฉ่ำ ไร้น้ำตาลทรายขาว",
        ingredients: [
            {
                nameTh: "สตรอว์เบอร์รีหวานฉ่ำ",
                nameEn: "Sweet Wild Strawberry",
                percent: 35,
                icon: "🍓",
                benefit: "วิตามินซีสูงลิ่ว ช่วยบำรุงผิวพรรณกระจ่างใส สร้างคอลลาเจนธรรมชาติ",
                source: "สตรอว์เบอร์รีสดแดงฉ่ำจากแปลงปลูกไร้สารเคมี"
            },
            {
                nameTh: "บลูเบอร์รีป่าเม็ดอวบ",
                nameEn: "Alpine Blueberry",
                percent: 25,
                icon: "🫐",
                benefit: "อุดมด้วยสารแอนโทไซยานิน (Anthocyanin) บำรุงสายตาจากการจ้องจอ",
                source: "บลูเบอร์รีป่าลูกโต รสชาติเข้มข้นกลมกล่อม"
            },
            {
                nameTh: "ราสเบอร์รีสีทับทิม",
                nameEn: "Ruby Raspberry",
                percent: 20,
                icon: "🍇",
                benefit: "รสเปรี้ยวสดชื่น มีกรดเอลลาจิก ป้องกันริ้วรอยและปลุกความสดชื่นทันที",
                source: "คัดเก็บเฉพาะช่วงเช้าตรู่เพื่อความหอมหวานสดที่สุด"
            },
            {
                nameTh: "มัลเบอร์รีไทยปลอดสาร",
                nameEn: "Local Black Mulberry",
                percent: 20,
                icon: "🫐",
                benefit: "ธาตุเหล็กสูง บำรุงเลือดและสมอง รสชาติหวานลึกเป็นเอกลักษณ์",
                source: "ผลผลิตเกษตรกรไทยมาตรฐานเกษตรอินทรีย์"
            }
        ],
        nutrition: {
            calories: "160 kcal",
            protein: "2.1 g",
            healthyFats: "0.4 g",
            fiber: "6.5 g",
            sweetness: "40% (ความหวานธรรมชาติจากเบอร์รี)"
        },
        freshnessMetrics: {
            coolness: "98%",
            smoothness: "85%",
            energy: "95%",
            sweetnessBar: 40
        }
    },
    {
        id: "mixed-berry-yogurt",
        nameEn: "Mixed Berry",
        editionEn: "Creamy Probiotic Yogurt",
        nameTh: "มิกซ์เบอร์รี โยเกิร์ต สมูทตี้",
        price: 145,
        volume: "330 ml",
        tagType: "snow", // Snowflake & glass tag
        tagText: "PROBIOTIC FROST",
        theme: {
            primary: "#6a1b9a",
            secondary: "#b3e5fc",
            accent: "#ab47bc",
            bgGradient: "radial-gradient(circle at 50% 40%, #f8f3fc 0%, #ece2f7 45%, #d9d8f3 100%)",
            liquidColor: "linear-gradient(180deg, #9c27b0 0%, #7b1fa2 45%, #4a148c 100%)",
            liquidWave: "#42107e",
            labelBg: "linear-gradient(135deg, #81d4fa 0%, #b39ddb 60%, #ce93d8 100%)",
            labelText: "#1a237e",
            badgeBg: "#4a148c",
            cardGlow: "rgba(106, 27, 154, 0.3)"
        },
        badge: "Live Probiotics • Gut Health • Creamy Texture",
        highlight: "เบอร์รีเข้มข้น ผสานกรีกโยเกิร์ตนุ่มละมุน",
        description: "ยกระดับความอร่อยไปอีกขั้น! ผสานคุณค่าผลไม้เบอร์รี 4 สายพันธุ์เข้ากับโยเกิร์ตสดเข้มข้น เนื้อสัมผัสเนียนนุ่มละมุนลิ้น เปรี้ยวหวานกลมกล่อม มีจุลินทรีย์มีชีวิตช่วยดูแลลำไส้",
        ingredients: [
            {
                nameTh: "ผลไม้เบอร์รีสด 4 ชนิดบดข้น",
                nameEn: "4 Fresh Berries Blend",
                percent: 60,
                icon: "🍓🫐",
                benefit: "สารต้านอนุมูลอิสระจัดเต็ม เสริมสร้างภูมิคุ้มกัน และชะลอวัย",
                source: "สตรอว์เบอร์รี + บลูเบอร์รี + ราสเบอร์รี + มัลเบอร์รีแท้"
            },
            {
                nameTh: "กรีกโยเกิร์ตสดเข้มข้น (พรีไบโอติกส์)",
                nameEn: "Rich Probiotic Greek Yogurt",
                percent: 35,
                icon: "🍦",
                benefit: "มีจุลินทรีย์ที่มีชีวิตกว่าหมื่นล้านตัว ช่วยปรับสมดุลลำไส้ รสสัมผัสมันละมุน",
                source: "หมักบ่มธรรมชาติ เนื้อแน่น ไม่ใส่สารทำให้คงตัว"
            },
            {
                nameTh: "น้ำผึ้งดอกไม้ป่า & คาโมมายล์",
                nameEn: "Wild Blossom Nectar",
                percent: 5,
                icon: "🌸",
                benefit: "ให้ความหอมนุ่มละมุน ผ่อนคลาย สดชื่นสบายอารมณ์",
                source: "เกสรดอกไม้ป่าแท้ธรรมชาติ 100%"
            }
        ],
        nutrition: {
            calories: "215 kcal",
            protein: "8.5 g",
            healthyFats: "3.2 g",
            fiber: "7.0 g",
            sweetness: "35% (กลมกล่อมกำลังดี)"
        },
        freshnessMetrics: {
            coolness: "97%",
            smoothness: "99%",
            energy: "92%",
            sweetnessBar: 35
        }
    }
];

window.DRINK_MENUS = DRINK_MENUS;
