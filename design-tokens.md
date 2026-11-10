# Design Tokens — "Petrol & Brass"

แนวทาง: เรียบหรู ทันสมัย โครงของแอป (sidebar, header, ปุ่ม) ใช้โทนเดียวคือเขียวน้ำมันเข้ม
สีสันสงวนไว้ให้ "ข้อมูล" เท่านั้น (สถานะ, การแจ้งเตือน) และใช้สีทองเหลืองเป็นเส้นบาง ๆ บอกตำแหน่งปัจจุบันจุดเดียว

ค่าทั้งหมดอยู่ใน `src/theme/tokens.ts` — component ห้ามเขียนสี/ขนาดเองนอกเหนือจากนี้

## Color

| Token | ค่า | ใช้กับ |
| --- | --- | --- |
| `petrol.900` | `#0C2A2E` | พื้น sidebar |
| `petrol.700` | `#0F3A40` | primary: ปุ่มหลัก, ลิงก์, focus ring |
| `petrol.500` | `#2C5A60` | hover ของ primary |
| `petrol.50` | `#E7EEEE` | พื้น hover / selected บนพื้นสว่าง |
| `brass.500` | `#B08D57` | จุดบอกเมนูที่เลือก, โลโก้ (ไม่ใช้เป็นตัวอักษรบนพื้นขาว) |
| `brass.700` | `#7A5C2E` | ตัวอักษรสีทองบนพื้นสว่าง |
| `canvas` | `#F5F6F4` | พื้นหลังหน้า, hover ของแถวตาราง |
| `paper` | `#FFFFFF` | พื้น card, ตาราง, dialog, header |
| `line` | `#E2E5E1` | เส้นขอบและเส้นคั่น |
| `lineSoft` | `#EEF0ED` | เส้นคั่นระหว่างแถวตาราง |
| `lineStrong` | `#D5DAD5` | ขอบปุ่ม outline และ filter chip |
| `text.primary` | `#172124` | ข้อความหลัก |
| `text.secondary` | `#566366` | ข้อความรอง, หัวคอลัมน์ |
| `text.disabled` | `#9AA5A6` | ข้อความ disabled |
| `onDark.primary` | `#E9EFEE` | ข้อความบน sidebar |
| `onDark.secondary` | `#9DB1B1` | ชื่อกลุ่มเมนูบน sidebar |
| `onDark.muted` | `#C9D6D5` | เมนูที่ไม่ได้เลือก |

### Semantic

| Token | main | soft (พื้น) |
| --- | --- | --- |
| `success` | `#1F7A4D` | `#E4F2EA` |
| `warning` | `#9A5B00` | `#FBEFD9` |
| `error` | `#B3261E` | `#FBE9E7` |
| `info` | `#1F5F8B` | `#E3EEF6` |

### Status (ข้อมูล)

สีของสถานะต่างกันทั้งเฉดและความสว่าง และแสดงคู่กับชื่อสถานะเสมอ (ไม่ใช้สีอย่างเดียวสื่อความหมาย)

| สถานะ | สี |
| --- | --- |
| Occupied | `#0F3A40` |
| Available | `#8FC7A6` |
| Reserved | `#B08D57` |
| Maintenance | `#7C5CD6` |
| Expired | `#E39A4F` |
| Terminated | `#8A2A22` |

## Typography

ฟอนต์เดียวทั้งระบบ: **Anuphan Variable** (รองรับไทยและอังกฤษ, โหลดจาก package ไม่เรียก CDN)
ตัวเลขในตารางใช้ `font-variant-numeric: tabular-nums`

| Token | ขนาด / line-height | น้ำหนัก | ใช้กับ |
| --- | --- | --- | --- |
| `h1` | 32 / 40 | 600 | ชื่อหน้า |
| `h2` | 20 / 28 | 600 | หัวข้อ section, ชื่อ dialog |
| `h3` | 16 / 24 | 600 | หัวข้อย่อย, ชื่อแอป |
| `body1` | 16 / 24 | 400 | เนื้อหา |
| `body2` | 14 / 22 | 400 | ตาราง, เมนู, ปุ่ม |
| `caption` | 12 / 18 | 500 | หัวคอลัมน์, ชื่อกลุ่มเมนู, คำอธิบาย |

ไม่ใช้ตัวพิมพ์ใหญ่ทั้งคำ (`text-transform: none` ทุกที่)

## Spacing

กริด 4px ผ่าน `theme.spacing` ของ MUI (1 หน่วย = 8px, ใช้ 0.5 ได้): 4, 8, 12, 16, 24, 32, 48

## Radius

| Token | ค่า | ใช้กับ |
| --- | --- | --- |
| `sm` | 6 | ปุ่ม pagination |
| `md` | 8 | ปุ่ม, input, เมนูใน sidebar |
| `lg` | 16 | card, ตาราง |
| `xl` | 20 | dialog |
| `pill` | 999 | filter chip |

## Elevation

พื้นผิวปกติไม่มีเงา ใช้เส้นขอบ `line` 1px แทน
เงามีแบบเดียวสำหรับสิ่งที่ลอยทับหน้าจอ (dialog, menu, drawer บนมือถือ):
`0 12px 32px -8px rgba(12, 42, 46, 0.18)`

## Layout

| Token | ค่า |
| --- | --- |
| `header.height` | 64 |
| `sidebar.width` | 264 |
| `content.maxWidth` | 1200 |
| `content.padding` | 16 (xs) / 24 (md) / 40 (lg) |
| breakpoint มือถือ | ต่ำกว่า `lg` (1200px) |

## Accessibility

- ข้อความทั้งหมดผ่าน WCAG AA (4.5:1) บนพื้นของตัวเอง
- focus ring: `2px solid petrol.700` ห่าง 2px (บน sidebar ใช้ `brass.500`)
- เป้ากดขั้นต่ำ 44px บนมือถือ, 36px บน desktop
- เคารพ `prefers-reduced-motion`
