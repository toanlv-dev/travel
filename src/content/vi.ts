import type { SiteContent } from './types.ts';

// Nội dung mẫu — xem checklist cần khách gửi ở README §7. Sửa file này thì sửa cả en.ts.
export const content: SiteContent = {
  locale: 'vi',
  seo: {
    title: 'Công ty Du lịch Việt — Tour trong nước trọn gói từ 2013',
    description:
      'Công ty lữ hành có giấy phép, tổ chức tour trong nước từ Sa Pa đến Phú Quốc. 12 năm kinh nghiệm, hơn 8.500 lượt khách, đánh giá trung bình 4,9/5.',
    ogLocale: 'vi_VN',
  },
  nav: [
    { anchor: 'about', label: 'Về chúng tôi' },
    { anchor: 'tours', label: 'Tour du lịch' },
    { anchor: 'destinations', label: 'Điểm đến' },
    { anchor: 'clients', label: 'Khách hàng' },
    { anchor: 'contact', label: 'Liên hệ' },
  ],
  langSwitch: {
    toOther: 'View the English version',
    labelEn: 'EN',
    labelVi: 'VI',
  },
  header: {
    navLabel: 'Điều hướng chính',
    callCta: 'Tư vấn miễn phí',
    openMenu: 'Mở menu',
    closeMenu: 'Đóng menu',
    skipToContent: 'Bỏ qua, tới nội dung chính',
  },
  hero: {
    overline: 'Lữ hành có giấy phép · Từ 2013',
    heading: 'Khám phá Việt Nam cùng người bản địa',
    tagline: 'từng thung lũng, từng khúc biển, từng bữa ăn đáng để dừng chân',
    description:
      'Chúng tôi thiết kế và tổ chức tour trọn gói khắp ba miền — từ ruộng bậc thang Sa Pa, hang động Quảng Bình đến những hòn đảo phương Nam.',
    ctaPrimary: 'Gọi tư vấn miễn phí',
    ctaSecondary: 'Xem tour trong nước',
    trustLine: '12 năm · hơn 8.500 lượt khách · đánh giá 4,9/5',
    imageAlt: 'Ruộng bậc thang lúa chín vàng trên sườn đồi Sa Pa',
  },
  statsHeading: 'Năng lực của chúng tôi qua con số',
  stats: [
    { value: 12, label: 'năm tổ chức tour trong nước' },
    { value: 8500, suffix: '+', label: 'lượt khách đã phục vụ' },
    { value: 640, suffix: '+', label: 'chuyến đã khởi hành' },
    { value: 4.9, decimals: 1, label: 'điểm đánh giá trung bình trên 5' },
  ],
  about: {
    overline: 'Về chúng tôi',
    heading: 'Công ty lữ hành, không phải trang đặt chỗ',
    body: [
      'Chúng tôi là công ty lữ hành Việt Nam, trụ sở tại TP. Hồ Chí Minh. Mọi hành trình chúng tôi bán đều là hành trình chúng tôi đã tự đi, với hướng dẫn viên lớn lên ở chính vùng đất đó.',
      'Chúng tôi tự tổ chức đoàn chứ không bán lại chỗ của đơn vị khác. Nghĩa là khi kế hoạch thay đổi — bão ở Quảng Bình, đường lên Sa Pa tắc — người bạn gọi chính là người quyết được.',
    ],
    licenseLabel: 'Giấy phép lữ hành quốc tế',
    imageAlt: 'Phố cổ Hội An lên đèn buổi tối',
  },
  whyUs: {
    overline: 'Vì sao chọn chúng tôi',
    heading: 'Điều một trang đặt chỗ không làm được cho bạn',
    description:
      'Chúng tôi chỉ làm tour trong nước. Hẹp lại là có chủ đích — nhờ vậy mới biết đoạn đường nào ngập tháng Mười, homestay nào thực sự có nước nóng.',
    items: [
      { icon: 'map', title: 'Am hiểu từng vùng miền', description: 'Bắc — Trung — Nam, hướng dẫn viên sống ở chính nơi họ đưa bạn đến.' },
      { icon: 'wallet', title: 'Báo giá theo đoàn', description: 'Cho biết số khách và nhu cầu, chúng tôi báo trọn gói, không phát sinh ẩn.' },
      { icon: 'clock', title: 'Phản hồi trong một giờ', description: 'Làm việc 8:00–20:00 cả tuần, qua điện thoại hoặc Zalo.' },
      { icon: 'users', title: 'Hướng dẫn viên thật', description: 'Có thẻ hành nghề, kể được câu chuyện sau mỗi điểm đến, tiếng Việt hoặc tiếng Anh.' },
      { icon: 'headset', title: 'Luôn liên lạc được', description: 'Một số điện thoại duy nhất trước, trong và sau chuyến đi.' },
      { icon: 'shield', title: 'Có giấy phép, có bảo hiểm', description: 'Giấy phép lữ hành quốc tế, mọi chuyến đều có bảo hiểm du lịch.' },
    ],
  },
  tours: {
    overline: 'Tour du lịch',
    heading: 'Sáu hành trình chúng tôi tự tổ chức',
    description:
      'Mọi chuyến dưới đây đều do đội ngũ của chúng tôi tổ chức, không bán lại của đơn vị khác. Đoàn giữ nhỏ để còn đổi được lịch khi thời tiết đổi.',
    filters: { all: 'Tất cả', bac: 'Miền Bắc', trung: 'Miền Trung', nam: 'Miền Nam' },
    durationLabel: 'Thời lượng',
    detailCta: 'Xem lịch trình',
    itineraryLabel: 'Lịch trình từng ngày',
    quoteNote: 'Giá tuỳ số lượng khách và mùa — gọi hoặc nhắn tin để nhận báo giá.',
    items: [
      {
        slug: 'sapa-trek',
        region: 'bac',
        name: 'Sa Pa và thung lũng Mường Hoa đi bộ',
        province: 'Lào Cai',
        duration: '3 ngày 2 đêm',
        highlights: [
          'Hai ngày đi bộ qua các bản người Mông và người Dao',
          'Một đêm homestay nhà dân, một đêm trong thị trấn',
          'Hướng dẫn viên người bản địa, nói được tiếng dân tộc',
        ],
        itinerary: [
          { label: 'Ngày 1', detail: 'Từ Hà Nội lên Sa Pa, chiều đi bộ xuống bản Lao Chải.' },
          { label: 'Ngày 2', detail: 'Trọn ngày trek qua Tả Van và Giàng Tà Chải, tối ăn cùng gia đình chủ nhà.' },
          { label: 'Ngày 3', detail: 'Sáng đi chợ phiên, tối về tới Hà Nội.' },
        ],
        imageAlt: 'Khách đi bộ cùng phụ nữ người Mông trên đường mòn gần Sa Pa',
      },
      {
        slug: 'halong-cruise',
        region: 'bac',
        name: 'Ngủ đêm trên thuyền gỗ vịnh Hạ Long',
        province: 'Quảng Ninh',
        duration: '2 ngày 1 đêm',
        highlights: [
          'Ngủ lại trên thuyền, tránh giờ cao điểm khách đi trong ngày',
          'Chèo kayak vào hang Luồn lúc sớm mai',
          'Tối đa 16 khách mỗi thuyền',
        ],
        itinerary: [
          { label: 'Ngày 1', detail: 'Trưa lên thuyền, ăn trưa khi thuyền chạy, chiều kayak và tắm biển, tối ăn trên boong.' },
          { label: 'Ngày 2', detail: 'Ngắm bình minh giữa núi đá, thăm hang, đầu giờ chiều về bờ.' },
        ],
        imageAlt: 'Thuyền buồm gỗ giữa các đảo đá vôi vịnh Hạ Long',
      },
      {
        slug: 'phongnha-cave',
        region: 'trung',
        name: 'Phong Nha và động Thiên Đường',
        province: 'Quảng Bình',
        duration: '2 ngày 1 đêm',
        highlights: [
          'Đi thuyền trên sông Son vào động Phong Nha',
          'Đi bộ một cây số đầu tiên trong động Thiên Đường',
          'Chiều tắm suối Nước Moọc',
        ],
        itinerary: [
          { label: 'Ngày 1', detail: 'Thuyền sông Son vào động Phong Nha, chiều nghỉ ở suối Nước Moọc.' },
          { label: 'Ngày 2', detail: 'Sáng vào động Thiên Đường, chiều về Đồng Hới kịp chuyến tàu tối.' },
        ],
        imageAlt: 'Nhũ đá và lối đi trong động Thiên Đường, Quảng Bình',
      },
      {
        slug: 'hue-hoian',
        region: 'trung',
        name: 'Huế – Hội An qua đèo Hải Vân',
        province: 'Thừa Thiên Huế · Quảng Nam',
        duration: '4 ngày 3 đêm',
        highlights: [
          'Đại Nội và hai lăng vua ở Huế',
          'Vượt đèo Hải Vân, dừng ở những chỗ đáng dừng',
          'Hai đêm trong phố cổ Hội An',
        ],
        itinerary: [
          { label: 'Ngày 1', detail: 'Tới Huế, chiều thăm Đại Nội, tối ăn bên sông Hương.' },
          { label: 'Ngày 2', detail: 'Lăng Tự Đức và lăng Khải Định, chiều tự do.' },
          { label: 'Ngày 3', detail: 'Vượt đèo Hải Vân về Hội An, tối phố cổ lên đèn.' },
          { label: 'Ngày 4', detail: 'Đi bộ phố cổ, Chùa Cầu, rời đi từ Đà Nẵng.' },
        ],
        imageAlt: 'Chùa Cầu Hội An soi bóng xuống kênh',
      },
      {
        slug: 'mekong-tour',
        region: 'nam',
        name: 'Chợ nổi Cái Răng và miệt vườn',
        province: 'Cần Thơ',
        duration: '2 ngày 1 đêm',
        highlights: [
          'Xuống ghe lúc 5g30, trước khi chợ vãn',
          'Một đêm ở nhà dân ven kênh',
          'Xem làm hủ tiếu và đi vườn trái cây',
        ],
        itinerary: [
          { label: 'Ngày 1', detail: 'TP. Hồ Chí Minh đi Cần Thơ, chiều đi ghe trong kênh, tối ăn cùng chủ nhà.' },
          { label: 'Ngày 2', detail: 'Dậy sớm đi chợ nổi Cái Răng, ghé lò hủ tiếu, chiều về.' },
        ],
        imageAlt: 'Ghe chở đầy nông sản ở chợ nổi Cái Răng',
      },
      {
        slug: 'dalat-tour',
        region: 'nam',
        name: 'Đà Lạt: hoa, cà phê và rừng thông',
        province: 'Lâm Đồng',
        duration: '3 ngày 2 đêm',
        highlights: [
          'Thăm một nông trại cà phê thật, từ quả tới ly',
          'Vườn hoa và ga xe lửa cũ',
          'Đêm lạnh — nhớ mang áo khoác, kể cả tháng Bảy',
        ],
        itinerary: [
          { label: 'Ngày 1', detail: 'Tới Đà Lạt, chiều đi vườn hoa, tối ra chợ đêm.' },
          { label: 'Ngày 2', detail: 'Nông trại cà phê và xưởng rang, chiều ra hồ Tuyền Lâm.' },
          { label: 'Ngày 3', detail: 'Ga xe lửa cũ, dinh Bảo Đại, rồi khởi hành về.' },
        ],
        imageAlt: 'Xe ngựa bên luống hoa trong một vườn hoa Đà Lạt',
      },
    ],
  },
  destinations: {
    overline: 'Điểm đến',
    heading: 'Chín nơi chúng tôi thuộc đường',
    description: 'Tất cả đều trong nước. Bắc, Trung, Nam — vuốt để xem.',
    prevLabel: 'Xem các điểm đến trước',
    nextLabel: 'Xem các điểm đến tiếp theo',
    items: [
      { slug: 'ha-long', name: 'Vịnh Hạ Long', region: 'bac', tourCount: '4 tour', imageAlt: 'Núi đá vôi nhô lên khỏi mặt nước vịnh Hạ Long' },
      { slug: 'sapa', name: 'Sa Pa', region: 'bac', tourCount: '3 tour', imageAlt: 'Ruộng bậc thang xanh ở thung lũng Mường Hoa' },
      { slug: 'ninh-binh', name: 'Ninh Bình', region: 'bac', tourCount: '2 tour', imageAlt: 'Thuyền chèo vào hang trên sông Tràng An' },
      { slug: 'hue', name: 'Huế', region: 'trung', tourCount: '3 tour', imageAlt: 'Cổng trang trí của Đại Nội Huế' },
      { slug: 'hoi-an', name: 'Hội An', region: 'trung', tourCount: '5 tour', imageAlt: 'Dãy nhà vàng trong phố cổ Hội An' },
      { slug: 'da-nang', name: 'Đà Nẵng', region: 'trung', tourCount: '3 tour', imageAlt: 'Cầu Rồng Đà Nẵng lên đèn ban đêm' },
      { slug: 'phong-nha', name: 'Phong Nha', region: 'trung', tourCount: '2 tour', imageAlt: 'Cửa hang và dòng sông xanh ở Phong Nha' },
      { slug: 'da-lat', name: 'Đà Lạt', region: 'nam', tourCount: '2 tour', imageAlt: 'Luống hoa trong một vườn hoa Đà Lạt' },
      { slug: 'mekong', name: 'Miền Tây', region: 'nam', tourCount: '3 tour', imageAlt: 'Ghe chở nông sản trên sông miền Tây' },
    ],
  },
  clients: {
    overline: 'Ai đang đi cùng chúng tôi',
    heading: 'Những doanh nghiệp đặt tour mỗi năm',
    description:
      'Du lịch công ty, tour khen thưởng và đoàn gia đình — phần lớn chuyến đi đến từ khách đã quay lại.',
    placeholderNote: 'Ô chờ — logo khách hàng thật sẽ đặt vào đây sau khi được đồng ý cho đăng.',
    items: [
      { id: 'client-1', name: 'Logo khách hàng 1' },
      { id: 'client-2', name: 'Logo khách hàng 2' },
      { id: 'client-3', name: 'Logo khách hàng 3' },
      { id: 'client-4', name: 'Logo khách hàng 4' },
      { id: 'client-5', name: 'Logo khách hàng 5' },
      { id: 'client-6', name: 'Logo khách hàng 6' },
    ],
  },
  testimonials: {
    overline: 'Khách nói gì',
    heading: 'Cảm nhận sau chuyến đi',
    description: 'Phản hồi thu thập sau mỗi đoàn, đăng khi khách đồng ý.',
    placeholderNote: 'Nội dung mẫu — sẽ thay bằng phản hồi thật của khách.',
    prevLabel: 'Cảm nhận trước',
    nextLabel: 'Cảm nhận tiếp theo',
    ratingLabel: '{n} trên 5 sao',
    items: [
      {
        id: 't1',
        quote:
          'Sáng hôm thứ hai trời trở, hướng dẫn viên đổi lộ trình ngay, hoá ra lại thành ngày vui nhất chuyến. Chọn công ty bản địa là vì cái quyết đoán đó.',
        author: 'Khách hàng A',
        role: 'Nội dung mẫu — tên và công ty sẽ cập nhật',
        rating: 5,
      },
      {
        id: 't2',
        quote:
          'Đoàn có hai ông bà và một bé bốn tuổi. Mọi thứ được sắp vừa sức: đi bộ ngắn lại, ăn sớm hơn, xe lúc nào cũng cách không quá mười phút.',
        author: 'Khách hàng B',
        role: 'Nội dung mẫu — tên và công ty sẽ cập nhật',
        rating: 5,
      },
      {
        id: 't3',
        quote:
          'Hai mươi hai người của công ty, ba ngày, không ai lạc và không ai phàn nàn. Lịch trình gửi trước cả tháng và giữ nguyên đến cuối.',
        author: 'Khách hàng C',
        role: 'Nội dung mẫu — tên và công ty sẽ cập nhật',
        rating: 5,
      },
      {
        id: 't4',
        quote:
          'Nhắn Zalo lúc nào cũng trả lời trong vài phút, kể cả tối trước ngày đi khi chuyến bay của chúng tôi bị dời.',
        author: 'Khách hàng D',
        role: 'Nội dung mẫu — tên và công ty sẽ cập nhật',
        rating: 4,
      },
      {
        id: 't5',
        quote:
          'Nhớ nhất là mấy chỗ ăn. Không chỗ nào nằm trên phố du lịch, mà hướng dẫn viên gọi tên chủ quán được hết.',
        author: 'Khách hàng E',
        role: 'Nội dung mẫu — tên và công ty sẽ cập nhật',
        rating: 5,
      },
    ],
  },
  gallery: {
    overline: 'Từ những chuyến đi',
    heading: 'Ảnh dọc đường',
    description: 'Chạm vào ảnh để xem cỡ lớn.',
    openLabel: 'Xem ảnh cỡ lớn',
    closeLabel: 'Đóng ảnh',
    prevLabel: 'Ảnh trước',
    nextLabel: 'Ảnh tiếp theo',
    counterLabel: 'Ảnh {i}/{n}',
    items: [
      { slug: 'sapa-terraces', alt: 'Ruộng bậc thang lúa chín vàng trên sườn đồi Sa Pa', caption: 'Ruộng bậc thang trên thung lũng Mường Hoa, Sa Pa' },
      { slug: 'sapa-trek', alt: 'Lối mòn giữa những thửa ruộng bậc thang gần Sa Pa', caption: 'Đi bộ giữa các bản, Lào Cai' },
      { slug: 'halong-cruise', alt: 'Thuyền gỗ giữa các đảo đá vôi vịnh Hạ Long', caption: 'Ngủ đêm trên vịnh Hạ Long' },
      { slug: 'phongnha-cave', alt: 'Lòng hang được chiếu sáng ở Phong Nha', caption: 'Trong lòng hang Quảng Bình' },
      { slug: 'hoi-an-lanterns', alt: 'Con phố treo đèn lồng trong phố cổ Hội An', caption: 'Đêm đèn lồng phố cổ Hội An' },
      { slug: 'hue-hoian', alt: 'Chùa Cầu Hội An soi bóng xuống kênh', caption: 'Chùa Cầu, Hội An' },
      { slug: 'mekong-tour', alt: 'Ghe chở đầy nông sản ở chợ nổi Cái Răng', caption: 'Chợ nổi Cái Răng, Cần Thơ' },
      { slug: 'dalat-tour', alt: 'Luống hoa trong vườn ở Đà Lạt', caption: 'Vườn hoa Đà Lạt' },
    ],
  },
  posts: {
    overline: 'Cẩm nang',
    heading: 'Vài điều nên biết trước khi đi',
    description: 'Ghi chép của hướng dẫn viên — mùa nào đi đâu, mang gì, ăn ở chỗ nào.',
    placeholderNote: 'Bài mẫu — sẽ thay bằng bài viết của chính công ty.',
    readMore: 'Đọc bài',
    items: [
      {
        slug: 'sapa-season',
        category: 'Đi mùa nào',
        date: '12/03/2026',
        readingTime: 'đọc 4 phút',
        title: 'Sa Pa: tháng nào cho cảnh nào',
        excerpt:
          'Ruộng bậc thang tháng 5, tháng 9 và tháng 12 là ba cảnh khác hẳn nhau. Chọn tháng theo tấm ảnh mình thật sự muốn.',
        body: [
          'Mùa nước đổ từ giữa tháng 5 đến đầu tháng 6. Ruộng ngập nước soi bóng trời, đúng tấm ảnh phần lớn khách hình dung khi đặt tour. Đổi lại hay mưa, đường giữa các bản lầy đất sét.',
          'Lúa chín rơi vào giữa tháng 9 đến đầu tháng 10 — đồi vàng rực, thời tiết ổn định nhất năm. Đây cũng là lúc đông nhất, phòng ở Tả Van và Lao Chải hết sớm.',
          'Tháng 12 và tháng 1 lạnh, đêm có khi dưới 5°C, sương có thể phủ cả ngày trong thung lũng. Ít khách, giá mềm, nhưng không chắc có cảnh để ngắm. Mang áo ấm thật, đừng mang áo gió.',
        ],
      },
      {
        slug: 'cave-packing',
        category: 'Mang gì',
        date: '28/02/2026',
        readingTime: 'đọc 3 phút',
        title: 'Vào hang Quảng Bình thì mang những gì',
        excerpt:
          'Giày thoát nước nhanh, đèn đội đầu kèm pin dự phòng, và đừng mang thứ gì sợ ướt.',
        body: [
          'Nền hang gần như chỗ nào cũng ướt, nhiều đoạn lội nước ngang đầu gối. Giày thể thao bít mũi thoát nước nhanh hơn hẳn dép: đá vừa sắc vừa trơn.',
          'Đèn điện thoại không đủ sáng trong các vòm lớn. Đèn đội đầu để rảnh hai tay, rất cần khi leo thang trong động Thiên Đường và hang Tối.',
          'Đồ điện tử cho hết vào túi chống nước. Riêng độ ẩm đã đủ làm mờ ống kính, còn đoạn nhảy xuống nước ở hang Tối là một phần của hành trình chứ không phải tai nạn.',
        ],
      },
      {
        slug: 'eating-well',
        category: 'Ăn uống',
        date: '15/01/2026',
        readingTime: 'đọc 5 phút',
        title: 'Ăn ngon dọc đường mà không đau bụng',
        excerpt:
          'Quán đông khách, đồ nấu ngay trước mặt, và một quy tắc về đá lạnh thật sự đáng nhớ.',
        body: [
          'Quán đông thì nguyên liệu quay vòng nhanh, điều đó quan trọng hơn mấy chiếc ghế nhựa trông sạch hay không. Cứ nhìn trưa dân văn phòng quanh đó ăn ở đâu.',
          'Ưu tiên món nấu tại chỗ trước mặt mình — phở, bánh mì nướng lúc đứng chờ, lẩu. Cẩn thận hơn với gỏi nguội và trái cây gọt sẵn để lâu ngoài quầy.',
          'Đá ở quán cà phê và nhà hàng là đá công nghiệp, nhìn chung an toàn: loại hình trụ trong suốt có lỗ giữa. Đá nhuyễn đục trong xô không nhãn mới là thứ nên bỏ qua.',
        ],
      },
    ],
  },
  contact: {
    overline: 'Liên hệ',
    heading: 'Nói cho chúng tôi biết bạn muốn đi đâu',
    description:
      'Không có form đặt tour. Gọi hoặc nhắn tin là gặp thẳng người lên lịch trình cho chuyến đi.',
    hotlineLabel: 'Hotline',
    emailLabel: 'Email',
    hoursLabel: 'Giờ làm việc',
    hours: 'Thứ Hai đến Chủ nhật, 8:00 – 20:00',
    addressLabel: 'Văn phòng',
    mapCta: 'Mở trong Google Maps',
  },
  footer: {
    about:
      'Công ty lữ hành Việt Nam có giấy phép, tổ chức tour trọn gói khắp ba miền đất nước.',
    linksHeading: 'Nội dung',
    contactHeading: 'Liên hệ',
    followHeading: 'Theo dõi',
    copyright: '© {year} {name} — Bảo lưu mọi quyền.',
    backToTop: 'Lên đầu trang',
  },
  mobileBar: {
    navLabel: 'Liên hệ nhanh',
    call: 'Gọi ngay',
    zalo: 'Zalo',
    messenger: 'Nhắn tin',
  },
};
