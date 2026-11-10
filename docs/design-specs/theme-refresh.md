# Design Spec: Theme refresh ("Petrol & Brass")

เปลี่ยนหน้าตาของ starter ทั้งชุดให้เรียบหรู ทันสมัย โดยไม่เปลี่ยนโครง navigation
ค่าสี/ขนาดทั้งหมดอ้างจาก [`design-tokens.md`](../../design-tokens.md)

## 1. User Flow

1. เปิดแอป → redirect ไป `/dashboard/overview`
2. เลือกเมนูใน sidebar → เนื้อหาเปลี่ยน, เมนูที่เลือกมีเส้นทองด้านซ้าย
3. กดปุ่มเมนูบน header → desktop: ย่อ/ขยาย sidebar, มือถือ: เปิด drawer ทับหน้าจอ
4. หน้า Overview: ดูตารางตัวอย่าง → สลับดู state ของตาราง (Data / Loading / Empty / Error) → เปลี่ยนหน้าด้วย pagination → กดไอคอนลบ → dialog ยืนยัน → ยืนยันหรือยกเลิก
5. เข้า path ที่ไม่มี → หน้า "ไม่พบหน้านี้" พร้อมปุ่มกลับ

## 2. Wireframe

Desktop (≥ 1200px)

```
┌──────────────────────────────────────────────────────────────┐
│ [≡]  ◆ UI Starter                                   header 64│  paper, เส้นล่าง 1px
├─────────────┬────────────────────────────────────────────────┤
│ Dashboard   │  Overview                              (h1)    │
│▌Overview    │  ตัวอย่าง component ของ starter       (body2)   │
│ Analytics   │                                                │
│             │  Units            [Data|Loading|Empty|Error]   │  h2 + ตัวสลับ state ตัวอย่าง
│ sidebar 264 │  ┌──────────────────────────────────────────┐  │  card: paper, ขอบ 1px, radius 12
│ petrol.900  │  │ No.  Unit   Tenant   Status      Actions │  │  หัวตาราง: canvas, caption
│             │  │ 1    A-101  …        ● Available  👁 ✎ 🗑 │  │
│             │  ├──────────────────────────────────────────┤  │
│             │  │ Showing 1 to 5 of 12        ‹ 1 2 3 ›    │  │
│             │  └──────────────────────────────────────────┘  │
└─────────────┴────────────────────────────────────────────────┘
        canvas, เนื้อหากว้างสุด 1200 ชิดซ้าย
```

มือถือ (< 1200px): ไม่มี sidebar ถาวร, เนื้อหาเต็มจอ padding 16, ตารางเลื่อนแนวนอนได้ภายใน card

Sidebar

```
 Dashboard            ← ชื่อกลุ่ม: caption, onDark.secondary, กดเพื่อพับ/กาง
▌◻ Overview           ← เลือกอยู่: เส้น brass 2px ซ้าย, พื้นขาวโปร่ง 8%, ตัวอักษร 600
 ◻ Analytics          ← ปกติ: onDark.primary โปร่ง 80%, hover พื้นขาวโปร่ง 5%
```

Dialog ยืนยัน

```
┌────────────────────────────────────┐  paper, radius 16, กว้าง 440
│ Remove unit                    [×] │  h2
│                                    │
│ Remove A-101? This can't be undone.│  body1, text.secondary
│                                    │
│               [Cancel] [Remove]    │  ปุ่มหลักอยู่ขวาสุดเสมอ
└────────────────────────────────────┘
```

## 3. States

**ตาราง (`Table`)**

- loading: แถว skeleton 5 แถวตามจำนวนคอลัมน์ หัวตารางยังแสดง ไม่มี spinner
- empty: หัวตารางแสดง, ตรงกลางเนื้อที่ตารางมีข้อความ 2 บรรทัด (หัวข้อ `h3` + คำอธิบาย `body2`) ไม่มีรูปประกอบ ไม่แสดง pagination
- error: ตำแหน่งเดียวกับ empty, ข้อความสี `error` + ปุ่ม outline "Try again"
- success: แถวข้อมูล + pagination (แสดงเมื่อ `total` มากกว่า 0)
- partial: ค่าที่ว่างในเซลล์แสดง "–"

**Dialog**: ปุ่มยืนยัน disabled ไม่มีในชุดนี้ (confirm เป็น synchronous)

**หน้า Analytics**: ยังไม่มีเนื้อหา แสดง empty state ของหน้า (หัวข้อ + คำอธิบาย)

**Not found**: หัวข้อ + คำอธิบาย + ปุ่มหลัก

## 4. UI Copy

ภาษาเริ่มต้นของ starter คืออังกฤษ (`src/locales/en/translation.json`)

| Key | ข้อความ |
| --- | --- |
| `app.name` | UI Starter |
| `sidebar.dashboard` | Dashboard |
| `sidebar.overview` | Overview |
| `sidebar.analytics` | Analytics |
| `header.toggleMenu` | Toggle menu |
| `common.cancel` | Cancel |
| `common.confirm` | Confirm |
| `common.remove` | Remove |
| `common.save` | Save |
| `common.submit` | Submit |
| `common.close` | Close |
| `common.tryAgain` | Try again |
| `common.areYouSure` | Are you sure? |
| `common.confirmRemove` | Remove {{name}}? This can't be undone. |
| `common.confirmRemoveGeneric` | Remove this item? This can't be undone. |
| `common.confirmSubmit` | Submit this form? |
| `table.number` | No. |
| `table.showing` | Showing {{start}} to {{end}} of {{total}} |
| `table.emptyTitle` | Nothing here yet |
| `table.emptyDescription` | Items you add will show up in this list. |
| `table.errorTitle` | Couldn't load this list |
| `table.errorDescription` | Check your connection and try again. |
| `table.view` / `table.edit` / `table.remove` / `table.review` | View / Edit / Remove / Review (ปุ่มและ aria-label ของไอคอน) |
| `status.*` | All statuses / Available / Occupied / Reserved / Maintenance / Expired / Terminated |
| `overview.title` | Overview |
| `overview.description` | Sample page showing the starter's table, pagination and dialogs. |
| `overview.units` | Units |
| `overview.preview.*` | Preview table state (aria-label) / Data / Loading / Empty / Error |
| `overview.removeUnitTitle` | Remove unit |
| `overview.columns.*` | Unit / Tenant / Monthly rent / Status / Actions |
| `analytics.title` | Analytics |
| `analytics.emptyTitle` | No analytics yet |
| `analytics.emptyDescription` | Add your charts in src/pages/AnalyticsPage.tsx. |
| `notFound.title` | Page not found |
| `notFound.description` | The page you're looking for doesn't exist or has moved. |
| `notFound.back` | Back to overview |

## 5. Interactions

- เมนู sidebar: กดแล้ว navigate; บนมือถือปิด drawer หลังเลือก
- ชื่อกลุ่มเมนู: กดเพื่อพับ/กาง (ลูกศรหมุน), ค่าเริ่มต้นกางทั้งหมด
- ปุ่มเมนูบน header: desktop สลับ sidebar ระหว่าง 264 ↔ 0, มือถือเปิด drawer
- โลโก้/ชื่อแอป: เป็นลิงก์กลับ `/`
- ลบรายการ: ใช้ dialog (ไม่เปลี่ยนหน้า เพราะเป็นการยืนยันสั้น ๆ) ยืนยันแล้วลบออกจาก state ทันที (ข้อมูลตัวอย่างอยู่ในหน่วยความจำ ไม่มี API)
- ตัวสลับ state บนหน้า Overview: มีไว้ให้เห็นทุก state ของตารางใน starter (ข้อมูลตัวอย่างไม่มี API จริง) กด "Try again" ใน state error จะกลับไป Data
- Dialog: ปิดได้ด้วยปุ่ม ×, Cancel, กดพื้นหลัง และ Esc
- hover: แถวตาราง → พื้น `canvas`; ปุ่มหลัก → `petrol.500`
- motion: มีเฉพาะที่ตอบการกระทำของผู้ใช้ (sidebar เลื่อน, dialog, พับเมนู) ไม่มี animation ตอนโหลดหน้า

## 6. Responsive Behavior

| ช่วง | Sidebar | Content padding | ตาราง |
| --- | --- | --- | --- |
| xs–md (< 1200) | drawer ทับจอ กว้าง 264, เริ่มต้นปิด | 16 (xs), 24 (md) | เลื่อนแนวนอนใน card, pagination ซ้อน 2 บรรทัดบน xs |
| lg ขึ้นไป (≥ 1200) | ถาวร, ย่อได้ | 32 | เต็มความกว้าง card |

เป้ากดบนมือถือสูงอย่างน้อย 44px (เมนู sidebar, ปุ่ม icon)

## 7. Component Mapping

ใช้ของเดิม (ปรับหน้าตาผ่าน theme, แก้ bug):

- `Header`, `Sidebar`, `Layout`, `Table`, `Pagination`, `PrimaryButton`, `OutlineButton`, `IconImage`, `ModalProvider`

ใหม่ (ขออนุมัติ):

- `src/theme/` — `tokens.ts` + `index.ts` (MUI theme) แทน `Colors.ts` ที่เป็นสีกระจัดกระจาย
- `SidebarMenu` — แยกรายการเมนูออกมาใช้ร่วมกันระหว่าง desktop และ mobile (เดิมเขียนซ้ำ 2 ชุด)
- `StatusChip` — จุดสี + ชื่อสถานะ
- `PageHeader`, `EmptyState` — หัวหน้า และข้อความ empty/error ที่ใช้ซ้ำ
- `AppDialog`, `ConfirmContent`, `TableActions` — แยกออกจาก `ModalContext` และ `Table` เดิมให้ไฟล์เล็กลง
- `src/pages/` — `OverviewPage`, `AnalyticsPage`, `NotFoundPage`

## 8. Revision 2 — ปรับให้ประณีตขึ้น

ต่อยอดจากข้อ 1–7 ตาม design บน canvas "UI Starter — Petrol & Brass refined" ส่วนที่ขัดกับข้างบนให้ยึดข้อนี้

**Layout**

```
┌─────────────┬────────────────────────────────────────────────┐
│ ◇ UI Starter│ [≡]  Dashboard › Overview              header  │  desktop: header อยู่ข้าง sidebar
│             ├────────────────────────────────────────────────┤
│ Dashboard   │  Overview                               (h1 32)│
│ ▣ Overview •│  12 units in this sample list.                 │
│   Analytics │  ┌───────────────┬────────────────────────────┐│
│             │  │ Occupied      │ ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇  ││  สรุปการเข้าพัก
│ sidebar     │  │ 4 of 12 units │ ■ Available 3 ■ Occupied 4 ││
│ เต็มความสูง   │  └───────────────┴────────────────────────────┘│
│             │  Units                          [🔍 Search…]   │
│             │  (All 12) (Available 3) (Occupied 4) …         │  filter chip
│             │  ┌────────────────────────────────────────────┐│
│             │  │ ตาราง + pagination                          ││
└─────────────┴──┴────────────────────────────────────────────┴┘
```

- Sidebar เต็มความสูง มีโลโก้และชื่อแอปอยู่บนสุด เมนูที่เลือก: พื้นขาวโปร่ง 8% + จุด `brass.500` ด้านขวา (แทนเส้นด้านซ้าย)
- Header desktop: ปุ่มย่อ/ขยาย sidebar + breadcrumb "กลุ่ม › หน้า" (อ่านจาก `MenuGroup.ts`)
- Header มือถือ: พื้น `petrol.900` โลโก้ซ้าย ปุ่มเมนูขวา
- สถานะ: สี่เหลี่ยมสี 8px + ชื่อ ไม่มีพื้นหลัง
- มือถือ (< 1200px): แทนตารางด้วยรายการแถวละห้อง (ชื่อห้อง/ผู้เช่า ซ้าย, ค่าเช่า/สถานะ ขวา, ปุ่มลบ) และ filter chip เลื่อนแนวนอนในแถวเดียวบนจอ xs

**States**

- ค้นหา/กรองแล้วไม่เจอ: "No units match" + "Try a different search or status."
- ไม่มีห้องเลย: ข้อความ empty เดิมของตาราง
- ตัวสลับ state ตัวอย่าง (Data / Loading / Empty / Error) ถูกเอาออก — `Table` ยังรองรับ `loading` และ `error` เหมือนเดิม

**UI Copy ที่เพิ่ม**

| Key | ข้อความ |
| --- | --- |
| `overview.description` | {{count}} units in this sample list. |
| `overview.occupied` / `overview.ofUnits` | Occupied / of {{total}} units |
| `overview.rentPerMonth` | {{amount}} THB rent per month |
| `overview.byStatus` | Units by status (aria-label ของแถบสี) |
| `overview.filterLabel` / `overview.all` | Filter by status / All |
| `overview.searchPlaceholder` | Search units or tenants |
| `overview.noTenant` | No tenant |
| `overview.noMatchTitle` / `overview.noMatchDescription` | No units match / Try a different search or status. |
| `header.openMenu` / `header.breadcrumb` | Open menu / Breadcrumb |

**Interactions**

- ช่องค้นหา: กรองตามชื่อห้องหรือชื่อผู้เช่า หน่วง 250ms แล้วกลับไปหน้า 1
- Filter chip: เลือกได้ทีละหนึ่ง แสดงเฉพาะสถานะที่มีห้อง

**ต่างจาก design บน canvas (ตั้งใจ)**

- ไม่มีเมนู Units / Tenants, ปุ่ม Add unit และบล็อกบัญชีผู้ใช้ เพราะ starter ยังไม่มีหน้า ฟอร์ม หรือระบบ login รองรับ
- ช่องค้นหาอยู่ที่หัวข้อ Units (ค้นเฉพาะรายการนี้) ไม่ได้อยู่บน header
- ตารางยังแบ่งหน้า (6 แถว) แทนการแสดงทั้งหมดพร้อมยอดรวมค่าเช่า

**Component ใหม่**: `BrandMark`, `BrandLink`, `Breadcrumb`, `FilterChips`, `SearchField`, และเฉพาะหน้า Overview: `OccupancySummary`, `TenantCell`, `UnitList`
