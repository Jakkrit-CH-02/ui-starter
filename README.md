# ui-starter

โครงตั้งต้นสำหรับทำ web admin ด้วย React 19 + TypeScript + Vite ใช้ [MUI v7](https://mui.com/) เป็น UI library พร้อม theme "Petrol & Brass", layout (header + sidebar), ตาราง, pagination, ช่องค้นหา, filter, dialog ยืนยัน และ i18n

ใช้คู่กับ backend `api-starter` (Go + Fiber)

## สิ่งที่ต้องมี

- Node.js 20 หรือ 22 ขึ้นไป
- npm

## เริ่มต้นใช้งาน

```bash
npm install
cp .env.example .env.local    # แล้วแก้ค่าตามเครื่อง
npm run dev                   # http://localhost:7008
```

| คำสั่ง | ทำอะไร |
| --- | --- |
| `npm run dev` | รัน dev server ที่ port 7008 |
| `npm run build` | ตรวจ type แล้ว build ลงโฟลเดอร์ `build/` |
| `npm run preview` | เปิดดูผล build ที่ port 7008 |
| `npm run lint` | ตรวจโค้ดด้วย ESLint |
| `npm audit` | ตรวจช่องโหว่ของ dependency |

## Config

ตั้งค่าในไฟล์ `.env.local` (ไม่ถูก commit) ตัวอย่างอยู่ที่ `.env.example`

| ตัวแปร | ความหมาย |
| --- | --- |
| `VITE_APP_BASE_NAME` | sub-path ที่ deploy แอป ไม่ต้องใส่ `/` (เว้นว่าง = root) |
| `VITE_APP_API_ENDPOINT` | base URL ของ API เช่น `http://localhost:3005/api/v1` |
| `VITE_APP_IMAGE_ROOT` | base URL ของรูปภาพ |
| `VITE_APP_TENANT_ID`, `VITE_APP_CLIENT_ID`, `VITE_APP_REDIRECT_URL`, `VITE_APP_API_SCOPE` | ค่าสำหรับ sign-in (เว้นว่างได้ถ้ายังไม่ใช้) |

> ตัวแปร `VITE_*` ทุกตัวถูกฝังลงใน bundle ที่ส่งให้ browser **ห้ามใส่ secret**

ถ้าต้องการเปลี่ยนค่าหลัง build (เช่น image เดียว deploy หลาย environment) ให้กำหนด `window.env = { VITE_APP_API_ENDPOINT: "..." }` ใน script ที่โหลดก่อนแอป ค่านี้จะถูกใช้แทนค่าจาก `.env` — อ่านค่าทั้งหมดผ่าน `src/lib/config/env.ts`

## โครงสร้างโปรเจกต์

```
.
├── design-tokens.md            # สี ฟอนต์ ระยะ ของ theme (เอกสาร)
├── docs/design-specs/          # design spec ของแต่ละฟีเจอร์
├── public/                     # ไฟล์ static (favicon)
└── src/
    ├── main.tsx                # entry point: โหลดฟอนต์, i18n แล้ว render <App />
    ├── App.tsx                 # รวม provider: theme, react-query, language, modal, router
    ├── i18n.ts                 # ตั้งค่า i18next
    ├── theme/
    │   ├── tokens.ts           # design tokens — ที่เดียวที่เขียนค่าสี/ขนาด
    │   └── index.ts            # MUI theme ที่สร้างจาก tokens
    ├── routes/router.tsx       # ตาราง route
    ├── pages/                  # 1 ไฟล์ต่อ 1 หน้า
    ├── components/
    │   ├── layout/             # โครงหน้า: header + sidebar + เนื้อหา
    │   ├── common/             # component ที่ใช้ซ้ำ (Table, Pagination, ปุ่ม, dialog ฯลฯ)
    │   └── contexts/           # LanguageProvider, ModalProvider และ hook ของมัน
    ├── lib/
    │   ├── @types/             # type กลาง (API, ตาราง, เมนู)
    │   ├── config/             # env และ axios client (http.ts)
    │   ├── constants/          # ค่าคงที่, enum, เมนูของ sidebar
    │   ├── hooks/              # useDebounce, useWindowSize
    │   └── utils/              # ฟังก์ชันช่วยทั่วไป
    ├── locales/<lang>/         # ข้อความแปล
    └── assets/                 # รูปภาพ, โลโก้
```

## Theme

แนวทาง: โครงของแอปใช้โทนเขียวน้ำมันเข้มโทนเดียว สีสันสงวนไว้ให้ข้อมูล (สถานะ, การแจ้งเตือน) และมีจุดสีทองเหลืองบอกเมนูที่เลือกอยู่ รายละเอียดทั้งหมดอยู่ใน [`design-tokens.md`](./design-tokens.md)

- แก้สี/ฟอนต์/ขนาดที่ `src/theme/tokens.ts` ที่เดียว แล้วอัปเดต `design-tokens.md` ให้ตรงกัน
- หน้าตาของ component MUI (ปุ่ม, ตาราง, dialog) กำหนดที่ `src/theme/index.ts`
- ใน component ให้อ่านค่าผ่าน theme ไม่เขียนสีเอง:

  ```tsx
  <Box sx={(theme) => ({ backgroundColor: theme.tokens.color.canvas })} />
  <Typography color="text.secondary" />
  ```

- ฟอนต์คือ Anuphan (รองรับไทย/อังกฤษ) ติดตั้งผ่าน `@fontsource-variable/anuphan` จึงไม่เรียก CDN ภายนอก

## วิธีเพิ่มหน้าใหม่

1. สร้าง `src/pages/UsersPage.tsx`
2. เพิ่ม route ใน `src/routes/router.tsx`

   ```tsx
   { path: "management/users", element: <UsersPage /> },
   ```

3. เพิ่มเมนูใน `src/lib/constants/MenuGroup.ts` (`pathName` ต้องตรงกับ route)
4. เพิ่มข้อความใน `src/locales/en/translation.json` — ชื่อเมนูใช้ key `sidebar.<name>`

## Component ที่มีให้

| Component | ใช้ทำอะไร |
| --- | --- |
| `Table` | ตารางที่กำหนดคอลัมน์ด้วย `Column[]` รองรับ state loading / empty / error, เลขลำดับ, ปุ่ม action และ pagination |
| `Pagination` | แถบเปลี่ยนหน้า + ข้อความ "Showing 1 to 5 of 12" |
| `StatusChip` | สถานะ (สี่เหลี่ยมสี + ชื่อ) ตาม `StatusType` |
| `FilterChips` | แถวปุ่มกรองแบบเลือกได้ทีละหนึ่ง พร้อมตัวเลขจำนวน |
| `SearchField` | ช่องค้นหา (ใช้คู่กับ `useDebounce`) |
| `Breadcrumb` | "กลุ่ม › หน้า" บน header อ่านจากเมนูของ sidebar |
| `PrimaryButton`, `OutlineButton` | ปุ่มหลัก และปุ่มรอง |
| `PageHeader` | ชื่อหน้า + คำอธิบาย + ปุ่มด้านขวา |
| `EmptyState` | ข้อความกลางจอสำหรับ empty / error |
| `AppDialog` | dialog พื้นฐาน (ปกติเรียกผ่าน `useModal`) |

ตัวอย่างการใช้ทั้งหมดอยู่ที่ `src/pages/OverviewPage.tsx` ซึ่งใช้ข้อมูลจำลองจาก `sampleUnits.ts` ไฟล์ `OccupancySummary.tsx`, `TenantCell.tsx` และ `UnitList.tsx` (รายการแบบมือถือ) เป็นของหน้านี้โดยเฉพาะ ลบหรือแก้ได้เมื่อเชื่อม API จริง

### Dialog

```tsx
const { displayConfirmDeleteModal, handleClose } = useModal();

displayConfirmDeleteModal(
  (user) => {
    // ลบข้อมูล แล้วปิด dialog เอง (dialog ไม่ปิดอัตโนมัติ เพื่อรองานที่เป็น async ได้)
    handleClose();
  },
  user.name, // ชื่อที่แสดงในข้อความ "Remove {{name}}?"
  user
);
```

มี `displayModal` (เนื้อหาอะไรก็ได้), `displayConfirmModal`, `displayConfirmSubmitModal` และ `displayConfirmSaveModal` ด้วย

### เรียก API

ทุก request ให้ผ่าน `http` ใน `src/lib/config/http.ts` และใช้ TanStack Query จัดการ state ของข้อมูลจาก server:

```tsx
const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ["users"],
  queryFn: () => http.get<User[]>("/users").then((res) => res.data),
});

<Table columns={columns} rows={data ?? []} loading={isLoading} error={isError} onRetry={refetch} />
```

ถ้าต้องแนบ token หรือจัดการ error รวม ให้เพิ่ม `http.interceptors` ในไฟล์เดียวกัน

## เพิ่มภาษา

1. สร้าง `src/locales/th/translation.json` (copy โครงจาก `en`)
2. ใน `src/i18n.ts` import ไฟล์นั้น เพิ่มใน `resources` และ `SUPPORTED_LANGUAGES`
3. เปลี่ยนภาษาด้วย `const { language, setLanguage } = useLanguage()`

## ความปลอดภัยของ dependency

- `npm audit` ต้องได้ `found 0 vulnerabilities` ก่อน merge
- ใน `package.json` มี `overrides` บังคับให้ `@typescript-eslint/typescript-estree` ใช้ `minimatch` 11 เพราะเวอร์ชันที่มันขอมา (10.x) ยังมีช่องโหว่ DoS (GHSA-g3hv-75wg-m249) เมื่อ typescript-eslint ออกเวอร์ชันที่แก้แล้วให้ลบ `overrides` ออก
