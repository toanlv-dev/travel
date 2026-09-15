# Trang giới thiệu công ty du lịch

Landing page thuần frontend, **song ngữ Anh–Việt**, không có backend và **không có form đặt tour** —
khách liên hệ qua gọi điện / Zalo / Messenger.

- **`/`** — bản tiếng Anh (mặc định)
- **`/vi/`** — bản tiếng Việt

Hai bản là **hai bản build tĩnh riêng**, không phải đổi ngôn ngữ bằng JavaScript. Google index được
cả hai, và mỗi bản chỉ tải nội dung của chính nó.

| | |
|---|---|
| Nền tảng | Vite 8 · React 19 · TypeScript 6 · Tailwind CSS 3.4 |
| Màn hình nhỏ nhất hỗ trợ | **iPhone 8 — 375×667** |
| Trình duyệt | Safari 15.4+ / Chrome · Firefox 2 phiên bản gần nhất |

---

## 1. Chạy thử trên máy

```bash
npm install
npm run dev        # bản tiếng Anh  → http://localhost:5173
npm run dev:vi     # bản tiếng Việt → http://localhost:5173
```

Hai lệnh trên chạy **một bản một lúc** (biến `VITE_LOCALE` quyết định), không chạy song song được
trên cùng cổng.

## 2. Build bản thật

```bash
npm run build      # kiểm kiểu + build cả hai bản + dựng sẵn HTML
npm run serve      # xem thử bản đã build (có gzip) → http://localhost:4180
```

Kết quả trong `dist/`:

```
dist/
├── index.html          ← bản tiếng Anh
├── sitemap.xml
├── robots.txt
├── assets/             ← JS, CSS, font của bản tiếng Anh
├── images/
└── vi/
    ├── index.html      ← bản tiếng Việt
    ├── assets/
    └── images/
```

> ⚠️ Bản `en` **phải build trước** vì nó xoá sạch `dist/`. Lệnh `npm run build` đã theo đúng thứ tự;
> đừng chạy riêng `npm run build:vi` rồi mới `npm run build:en`.

## 3. Sửa nội dung chữ

Toàn bộ chữ hiển thị nằm ở **hai file**, không nằm trong component:

```
src/content/en.ts    ← tiếng Anh
src/content/vi.ts    ← tiếng Việt
```

**Sửa một file thì phải sửa file kia.** Hai file bị ép cùng cấu trúc bởi `src/content/types.ts`,
nên thiếu một khoá là **lỗi biên dịch**, không phải lỗi âm thầm lúc chạy:

```bash
npm run typecheck    # thiếu bản dịch → báo lỗi ngay tại đây
```

Sau khi sửa nội dung, chạy lại **cả hai** lệnh này:

```bash
npm run fonts        # cắt lại font theo bộ chữ mới (nếu thêm ký tự lạ)
npm run build
```

### Thông tin không phải chữ dịch

`src/data/company.ts` — số điện thoại, email, địa chỉ, link Zalo/Messenger/mạng xã hội, số giấy
phép, domain. **Khai báo một chỗ duy nhất**, mọi nơi trên trang đều lấy từ đây.

## 4. Thay ảnh

```bash
assets-src/images/<nhóm>/<tên>.jpg    ← đặt ảnh gốc vào đây (khổ lớn, chưa nén)
npm run images                        ← sinh WebP + JPEG ở các mốc 480/720/960/1600
```

Ảnh sinh ra nằm ở `public/images/<nhóm>/<tên>-<width>.<đuôi>`; khai báo đường dẫn trong
`src/data/images.ts`, còn chữ `alt` nằm trong `src/content/{en,vi}.ts`.

**Không hotlink ảnh từ web khác** — mọi ảnh phải nằm trong repo. Nguồn và giấy phép từng ảnh ghi ở
`public/images/CREDITS.md`; ảnh mới cũng phải ghi vào đó.

## 5. Kiểm tra trước khi giao

```bash
npm run typecheck    # TypeScript
npm run lint         # oxlint
npm run verify       # 111 kiểm bố cục/tương tác bằng Chrome thật, cả hai ngôn ngữ
npm run a11y         # axe-core (WCAG 2.1 AA)
npm run lh           # Lighthouse mobile, trung vị 3 lần, cả hai ngôn ngữ
```

Ba lệnh cuối cần `dist/` đã build và `npm run serve` đang chạy — chúng mặc định trỏ vào
`http://localhost:4180`:

```bash
npm run build
npm run serve &     # server tĩnh có gzip
npm run verify && npm run a11y && npm run lh
```

> Đừng đo hiệu năng bằng `vite preview`: nó trả file **không nén** (JS 364KB thay vì 113KB) nên mọi
> chỉ số đều xấu đi một cách giả tạo. `npm run serve` có gzip, sát với máy chủ thật.

## 6. Đưa lên máy chủ

Chỉ là file tĩnh — copy nguyên thư mục `dist/` lên là chạy. Cấu hình nginx tối thiểu:

```nginx
server {
    listen 80;
    server_name vidu.com www.vidu.com;
    root /var/www/dulich/dist;
    index index.html;

    # Trang tĩnh, không có route ảo → chỉ cần trả file
    location / {
        try_files $uri $uri/ =404;
    }

    # Tên file có hash, đổi nội dung là đổi tên → cache lâu được
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /images/ {
        expires 30d;
        add_header Cache-Control "public";
    }

    gzip on;
    gzip_types text/html text/css application/javascript image/svg+xml application/xml;
    gzip_min_length 1024;
}
```

**Trước khi deploy phải đổi `siteUrl`** trong `src/data/company.ts` thành domain thật, rồi build lại
— giá trị đó đi vào `canonical`, `hreflang`, `sitemap.xml` và JSON-LD.

---

## 7. Checklist nội dung cần khách gửi

Đã nhận ngày 2026-09-15: **tên công ty, địa chỉ, email, số điện thoại** — đã vào code.
Phần còn lại vẫn là **nội dung mẫu**; những chỗ đó nhìn rõ là chỗ chờ (ô viền đứt, câu ghi "nội dung
mẫu"), và câu ghi chú **tự biến mất** khi có dữ liệu thật.

| # | Cần gửi | Vào file | Đang là |
|---|---------|----------|---------|
| 1 | ~~Tên công ty, địa chỉ~~ | `company.ts` · `content.contact.address` | ✅ **VIVA VIETNAM TRAVEL**, Ngọc Hà, Hà Nội |
| 2 | ~~Hotline, email~~ | `company.ts` · `content.contact.hotlineDisplay` | ✅ +84 332 146 395 · vivavietnamtravel@gmail.com |
| 2b | ~~Xác nhận số điện thoại có dùng Zalo~~ | `src/data/company.ts` → `zalo` | ✅ khách xác nhận 2026-09-15 — `zalo.me/0332146395` |
| 3 | **Số giấy phép lữ hành** | `src/data/company.ts` → `licenseNo` | `null` → **dòng giấy phép đang ẩn hẳn** ở About và Footer |
| 4 | **Link trang Facebook** (cho nút Messenger) | `src/data/company.ts` → `messenger` | `null` → **nút Messenger đang ẩn** |
| 5 | Link Facebook / YouTube cho footer | `src/data/company.ts` → `socials` | chỉ còn Zalo |
| 6 | Domain thật | `src/data/company.ts` → `siteUrl` | `https://example.com` |
| 7 | Logo công ty | `public/` + Header/Footer | đang in tên bằng chữ |
| 8 | **Logo khách hàng** (kèm cho phép đăng) | `public/images/clients/` + `src/data/clients.ts` | mục đổi sang **6 nhóm khách đoàn**; dải logo ẩn cho tới khi `clientLogos` có dòng đầu tiên |
| 9 | **Cảm nhận thật của khách** (tên, chức danh, cho phép đăng) | `src/content/{en,vi}.ts` → `testimonials` | 5 cảm nhận mẫu, tên "Khách hàng A…E" |
| 10 | **Ảnh thật từ các chuyến đi** | `assets-src/images/gallery/` + `src/data/images.ts` | dùng tạm ảnh phong cảnh đã tải |
| 11 | Bài viết của công ty | `src/content/{en,vi}.ts` → `posts` | 3 bài cẩm nang mẫu |
| 12 | **Số liệu thật** (số năm, số khách, đánh giá) | `src/content/{en,vi}.ts` → `stats` | ⚠️ 12 năm · 8.500 khách · 4,9/5 — **đang là số mẫu, hiện như thật** |
| 13 | Ảnh OG (1200×630) cho khi chia sẻ link | `public/` + `index.html` | chưa có |

> ⚠️ Mục **8, 9, 10, 12** là phần tạo niềm tin — cũng là phần **tuyệt đối không được bịa**. Không đặt
> tên doanh nghiệp có thật khi chưa xin phép, không gán lời chứng thực cho người có thật. Logo lấy
> trên mạng dán vào mục 8 là **tuyên bố quan hệ làm ăn không có thật**, đồng thời dùng nhãn hiệu của
> họ không phép — nên mục đó nay nói về *loại đoàn nhận tổ chức*, không mượn tên ai.
>
> Ba thứ chưa có thì **ẩn hẳn** thay vì để giá trị bịa: số giấy phép (mục 3), nút Messenger (mục 4)
> và nút Facebook/YouTube (mục 5). Riêng **số liệu ở mục 12 vẫn đang hiện như thật** — nhớ thay
> trước khi trang lên sóng.

Mỗi mục ở cột "file" đều là chữ hiển thị → **phải sửa cả `en.ts` lẫn `vi.ts`**.

## 8. Hai việc chỉ máy thật mới kiểm được

- **Safari trên iPhone**: hero dùng `100svh`, Chrome không mô phỏng đúng cách thanh địa chỉ Safari
  co giãn. Phải mở bằng iPhone thật xem hero có bị cắt không.
- **Bấm `tel:` / Zalo / Messenger**: link đã đúng định dạng và có kiểm tự động, nhưng chuyện mở đúng
  app thì chỉ điện thoại thật mới biết. Chỉ làm được sau khi có số và trang thật (mục 2 ở trên).

## 9. Cấu trúc thư mục

```
src/
├── content/         en.ts · vi.ts · types.ts   ← TOÀN BỘ chữ hiển thị
├── data/            company.ts · images.ts · clients.ts   ← dữ liệu không dịch
├── sections/        13 section của trang
├── components/
│   ├── common/      SmartImage · Reveal · CountUp · Lightbox · Rating …
│   ├── layout/      Section · Container · SectionHeading
│   └── ui/          button-variants.ts
├── lib/             cn.ts · useEmblaNav.ts · usePrefersReducedMotion.ts
├── styles/          tokens.css (màu/spacing) · globals.css · fonts.css (sinh tự động)
├── assets/fonts/    font đã cắt (sinh bởi npm run fonts)
├── entry-server.tsx ← dựng sẵn HTML lúc build
└── main.tsx

scripts/
├── fetch-photos.mjs      tải ảnh từ Wikimedia Commons (có bước duyệt bằng mắt)
├── optimize-images.mjs   sinh WebP/JPEG nhiều mốc width
├── subset-fonts.mjs      cắt font xuống bộ chữ dùng thật
├── prerender.mjs         dựng sẵn HTML sau khi build
├── serve.mjs             server tĩnh có gzip để đo hiệu năng
├── verify-layout.mjs     111 kiểm bố cục bằng Chrome thật
├── a11y.mjs              axe-core
└── lighthouse.mjs        Lighthouse mobile, lấy trung vị
```

Quy ước bắt buộc khi sửa code nằm ở [CLAUDE.md](CLAUDE.md).
