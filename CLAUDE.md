# CLAUDE.md — Page Du Lịch (landing page)

File này Claude tự đọc khi làm việc trong thư mục này. Chỉ ghi **những điều dễ nhầm**;
chi tiết đầy đủ nằm ở [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) · [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) · [CODING_PHASES.md](CODING_PHASES.md).

---

## 0. Task này KHÔNG theo quy trình Jira

Đây là **việc cá nhân**, nằm trong nhánh `ca_nhat/` của workspace — **không có ticket `IT-XXXX`**.

- ❌ Không `getJiraIssue`, không đổi trạng thái In Progress, không tìm sub-task `[DEV]`.
- ❌ Không tạo MR, không GitLab MCP, không KB MCP — dự án này **không liên quan osecore/ors**.
- ✅ Vẫn giữ: đọc `description.md` + `log.md` trước khi làm; báo cáo `file:line` trước khi commit;
  soát comment sau mỗi lượt review; cập nhật `log.md` theo ngày.

## 1. Hai cây thư mục tách rời — đừng để nhầm chỗ

| Thứ | Đường dẫn |
|-----|-----------|
| **Tài liệu** (file này, plan, design system, log) | `/var/www/html/tasks/ca_nhat/page_du_lich/` |
| **Source code** | `/var/www/html/projects/page-du-lich/` |

Code **không** nằm cùng chỗ tài liệu. Khi khởi tạo xong dự án ở Phase 0, **copy file này sang
`/var/www/html/projects/page-du-lich/CLAUDE.md`** — vì lúc code, Claude đứng ở cây `projects/` sẽ
không đọc được file ở cây `tasks/`.

## 2. Trang mẫu: URL thật nằm trong iframe

- `https://web4s.vn/view-demo/dulich07` → **chỉ là khung wrapper** của web4s, fetch về sẽ ra nội dung
  bán hàng của web4s (form đăng ký dùng thử, đăng ký đại lý) — **không phải** trang du lịch.
- URL thật: **`https://dulich07.themeweb4s.com`**. Đã phân tích sẵn ở
  [research/trang-mau-dulich07.md](research/trang-mau-dulich07.md) — đọc lại thay vì fetch lại.

## 3. Bẫy hay nhầm nhất

| # | Bẫy | Đúng phải là |
|---|-----|--------------|
| 1 | Cài **Tailwind v4** (mặc định của mọi tutorial mới và của `shadcn` CLI) | **Ghim `tailwindcss@^3.4`** — đang là 3.4.19. v4 cần Safari 16.4+, trong khi yêu cầu là hỗ trợ **iPhone 8** (nhiều máy còn iOS 15). Kiểm bằng `npx tailwindcss --help \| head -1`. **Không chạy `npx shadcn init`** — CLI của nó kéo v4 về; component ui/ tự viết trên Radix. |
| 2 | Lấy `#63AB45` (màu gốc trang mẫu) làm màu **nút / chữ** | `#63AB45` chỉ **2.9:1** trên nền trắng → trượt WCAG AA. Nền & icon lớn dùng `500 #63AB45`; **nút/link/chữ dùng `600 #4C8C33`**, hover `700 #3B6E28`. |
| 3 | Thiết kế từ 320px, hoặc dùng `100vh` cho hero | Sàn là **375×667 (iPhone 8)**. Hero dùng **`100svh`** (fallback `100vh`) — `100vh` bị thanh địa chỉ Safari cắt. |
| 4 | Thêm lại **form liên hệ** (react-hook-form, zod, Formspree…) | **Đã chốt BỎ form** (2026-09-14). Chỉ nút `tel:` / Zalo / Messenger. Muốn thêm phải hỏi user trước. |
| 5 | Bịa tên doanh nghiệp thật hoặc lời chứng thực gắn với người/công ty có thật khi làm placeholder | Placeholder phải **nhìn ra ngay là placeholder** (ô xám "Logo khách hàng"). Đây là section tạo niềm tin — bịa = sai. |
| 5a | Đưa lại **tour / điểm đến nước ngoài** (Pháp, Italy, Thái Lan, New York của trang mẫu) | Khách hàng **chỉ làm tour trong nước**. Phân loại bằng `region: 'bac' \| 'trung' \| 'nam'`, không phải trong nước/nước ngoài. |
| 5b | Thêm **giá tiền** hoặc nút **"Đặt tour"** vào card tour | Đã chốt bỏ. Kiểu `Tour` **không có** `price`, `oldPrice`, `discount`, `bookUrl`, `slotsLeft`. Card mở dialog lịch trình; CTA duy nhất là Gọi/Zalo. |
| 5c | Hotlink ảnh (`https://images.unsplash.com/...`) | **Mọi ảnh tải về `public/images/`**, nén WebP, xuất `480/960/1600`. Ảnh từ Pexels/Unsplash; **không** lấy ảnh của `dulich07.themeweb4s.com` (bản quyền của trang mẫu). Ghi nguồn vào `public/images/CREDITS.md`. |
| 6 | Nạp font bằng `<link>` Google Fonts, hoặc gõ `@fontsource-variable/be-vietnam-pro` | **Gói đúng là `@fontsource/be-vietnam-pro`** (font này KHÔNG có bản variable — gói `-variable` 404). Lora thì dùng `@fontsource-variable/lora`. Chỉ subset `latin` + `vietnamese`, **3 weight 400/600/700** (bỏ 500 để giữ ngân sách). Verify: Network tab **không** có request tới `fonts.googleapis.com`. |
| 7 | Hard-code màu/size trong component | Mọi giá trị đi qua CSS variable ở `src/styles/tokens.css` → map vào `tailwind.config.ts`. |
| 8 | Hard-code nội dung (tên tour, chữ trên nút, `alt` ảnh) trong JSX | Mọi **chữ hiển thị** ở `src/content/{en,vi}.ts`; hằng số **không dịch** (hotline, link Zalo, path ảnh) ở `src/data/`. |
| 9 | Thêm Next.js / react-router / Redux / axios | One-page tĩnh, không API. Điều hướng bằng **anchor scroll**. Đã cân nhắc và loại — xem IMPLEMENTATION_PLAN §1.3. |
| 10 | Dùng MUI / Ant Design / Bootstrap cho "nhanh" | Đã loại có lý do (xem bảng so sánh IMPLEMENTATION_PLAN §1.1). Dùng **Tailwind + shadcn/ui**. |
| 11 | Cho rằng `/` là **tiếng Việt** | **Ngược lại: `/` = tiếng ANH (mặc định)**, `/vi/` = tiếng Việt. `x-default` trỏ về `/`. Đây là chỗ dễ làm ngược nhất. |
| 12 | Cài `react-i18next`, hoặc đổi ngôn ngữ bằng `useState` | Không dùng thư viện i18n. Hai file `src/content/{en,vi}.ts` + alias Vite `@content` theo `VITE_LOCALE`. Đổi ngôn ngữ = **`<a href>` sang URL khác**, có reload. Xem IMPLEMENTATION_PLAN §5.1. |
| 13 | Dùng **cờ quốc gia** cho nút đổi ngôn ngữ | Cờ = quốc gia, không phải ngôn ngữ. Dùng chữ **`EN \| VI`**. |
| 14 | Deploy chỉ chạy `vite build` một lần | Phải `npm run build` (chạy **cả hai**). Thứ tự bắt buộc **en trước vi** — bản en `emptyOutDir` sẽ xoá sạch `dist/`, chạy ngược sẽ thổi bay `dist/vi/`. |
| 15 | Chỉ kiểm layout ở một ngôn ngữ | **Tiếng Việt dài hơn tiếng Anh 15–25%.** Nút/heading không được cố định `width`. Rà cả hai bản ở mọi breakpoint. |

## 4. Ba luật tiếng Việt không được vi phạm

1. `line-height` body **≥ 1.6**, heading **≥ 1.18** — dấu thanh (ắ, ễ, ộ) ăn thêm chiều cao,
   line-height kiểu tiếng Anh (1.4) làm chữ dính nhau.
2. `letter-spacing` = **0** cho body, **không bao giờ âm** — chữ có dấu sẽ chồng lấn.
3. **Không `text-transform: uppercase`** cho câu dài — dấu trên chữ hoa bị cắt. Chỉ nhãn ≤ 3 từ.

Cộng thêm: input **`font-size: 16px`** (nhỏ hơn → iOS tự zoom, vỡ layout) và vùng chạm **≥ 44×44px**.

## 5. Quyết định đã chốt với user (2026-09-14) — không tự đổi

| Hạng mục | Đã chốt |
|----------|---------|
| Tông màu | **Xanh lá thiên nhiên** (primary 500 `#63AB45` / 600 `#4C8C33` / 700 `#3B6E28`, accent `#F2A93B`, nền đậm `#12201A`) |
| Font | **Be Vietnam Pro** (heading + body) + **Lora italic** (chỉ slogan hero & trích dẫn testimonial, tối đa 2 chỗ) |
| Nền | 4 loại: `#FFFFFF` · `#F7F9F5` · `#12201A` · ảnh + overlay ≥ 45%. Hai section liền nhau không cùng nền |
| Nội dung | **Placeholder trước**, thay nội dung thật sau ở `src/content/{en,vi}.ts` |
| Liên hệ | **Bỏ form** — chỉ Gọi ngay / Zalo / Messenger |
| Phạm vi tour | **Chỉ trong nước (Việt Nam)** — bỏ toàn bộ tour/điểm đến nước ngoài |
| Card tour | **Không giá, không nút "Đặt tour"** — chỉ ảnh, tên, thời lượng, 3 điểm nhấn, nhãn miền |
| Ảnh | **Tải về `public/images/`**, không hotlink; nguồn Pexels/Unsplash, ghi `CREDITS.md` |
| Ngôn ngữ | **Anh + Việt.** `/` = **EN (mặc định)** · `/vi/` = VI. Nút đổi ở **góc phải header**, dạng chữ `EN \| VI` |
| Cách làm i18n | **Không dùng thư viện.** 2 file `src/content/{en,vi}.ts` cùng shape `SiteContent` + alias Vite → build 2 bản tĩnh, mỗi bản 1 ngôn ngữ |
| Stack | Vite **8.3** + React **19.3** + TS **6.0** + **Tailwind 3.4.19** + Radix + Embla + lucide-react. **Không có thư viện animation** — Reveal tự viết bằng IntersectionObserver (motion tốn ~40KB gzip, đã gỡ ở Phase 1) |

**Chưa chốt:** tên công ty, logo, hotline, địa chỉ, MXH thật (câu hỏi #4 trong `description.md`)
→ dùng placeholder, đánh dấu `// TODO`.

## 6. Verify bắt buộc trước khi báo "xong" một phase

```js
// Ở DevTools 375px — phải trả về mảng RỖNG
[...document.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > 375)
```

```bash
# Không còn FIELD giá / đặt tour trong data  (grep theo tên field, không grep chữ thường
# — "competitive pricing" ở WhyUs hay "Pháp" trong "pháp lý" là nội dung hợp lệ)
grep -rnE "\b(price|oldPrice|discount|bookUrl|slotsLeft)\s*[:?]" src/
# Không còn tour/điểm đến nước ngoài
grep -rniE "Italy|Thailand|Thái Lan|New York|Paris" src/content/
# Không còn ảnh hotlink từ ngoài
grep -rnE "https?://[^\"']*\.(jpg|jpeg|png|webp)" src/ index.html

# Song ngữ: hai bản phải cùng shape, và cả hai đều được build
npx tsc --noEmit                                   # thiếu bản dịch = lỗi compile
npm run build && ls dist/index.html dist/vi/index.html
grep -c hreflang dist/index.html dist/vi/index.html # mỗi bản ≥ 3 (en, vi, x-default)
grep -o '<html lang="[a-z]*"' dist/index.html dist/vi/index.html   # phải là en và vi
```

```bash
# Kiểm layout bằng Chrome thật (SPA nên không curl được): tràn ngang 7 breakpoint × 2 ngôn ngữ,
# vùng chạm 44px, nền xen kẽ, reduced-motion CẢ HAI CHIỀU, srcset ở DPR 2, CLS
npm run build && npx vite preview --port 4173 &   # rồi:
npm run verify
```

- Đo Lighthouse trên **bản build** (`npm run build && npm run preview`), **không** đo ở dev server.
- Kiểm iOS trên **Safari thật** — Chrome không mô phỏng đúng `svh` và hành vi thanh địa chỉ.
- Bật "Reduce motion" của OS → mọi animation phải tắt.
- Ngân sách: JS ≤ 180KB gzip · CSS ≤ 30KB gzip · LCP ≤ 2.5s · CLS ≤ 0.05 · Lighthouse ≥ 90/95/95.
