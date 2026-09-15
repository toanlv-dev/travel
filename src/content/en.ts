import type { SiteContent } from './types.ts';

// TODO: thay bằng nội dung thật của công ty (tên, slogan, số liệu).
export const content: SiteContent = {
  locale: 'en',
  seo: {
    title: 'Vietnam Travel Co. — Guided tours across Vietnam since 2013',
    description:
      'A licensed Vietnamese tour operator running guided trips from Sapa to Phu Quoc. 12 years, 8,500+ travellers, 4.9/5 average rating.',
    ogLocale: 'en_US',
  },
  nav: [
    { anchor: 'about', label: 'About us' },
    { anchor: 'tours', label: 'Tours' },
    { anchor: 'destinations', label: 'Destinations' },
    { anchor: 'clients', label: 'Our clients' },
    { anchor: 'contact', label: 'Contact' },
  ],
  langSwitch: {
    toOther: 'Xem bản tiếng Việt',
    labelEn: 'EN',
    labelVi: 'VI',
  },
  header: {
    navLabel: 'Main navigation',
    callCta: 'Free consultation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to main content',
  },
  hero: {
    overline: 'Licensed tour operator · Since 2013',
    heading: 'Discover Vietnam with people who live here',
    tagline: 'every valley, every coastline, every meal worth stopping for',
    description:
      'We design and run guided trips across all three regions of Vietnam — from the terraced hills of Sa Pa to the caves of Quang Binh and the islands of the south.',
    ctaPrimary: 'Call for free advice',
    ctaSecondary: 'Browse our tours',
    trustLine: '12 years · 8,500+ travellers · 4.9/5 average rating',
    imageAlt: 'Golden terraced rice fields on the hillsides of Sa Pa, northern Vietnam',
  },
  statsHeading: 'Our track record in numbers',
  stats: [
    { value: 12, label: 'years guiding in Vietnam' },
    { value: 8500, suffix: '+', label: 'travellers hosted' },
    { value: 640, suffix: '+', label: 'departures organised' },
    { value: 4.9, decimals: 1, label: 'average rating out of 5' },
  ],
  about: {
    overline: 'About us',
    heading: 'A local operator, not a booking website',
    body: [
      'We are a Vietnamese tour operator based in Ho Chi Minh City. Every itinerary we sell is one we have walked ourselves, with guides who grew up in the region they show you.',
      'We run our own departures rather than reselling other people’s seats. That means when plans change — a storm in Quang Binh, a road closed near Sa Pa — you talk to the people who can actually change them.',
    ],
    licenseLabel: 'International tour operator licence',
    imageAlt: 'Lantern-lit street in the old town of Hoi An in the evening',
  },
  whyUs: {
    overline: 'Why travel with us',
    heading: 'What you get that a booking site cannot give you',
    description:
      'We only run trips inside Vietnam. That narrowness is the point — it is why we know which road floods in October and which homestay actually has hot water.',
    items: [
      { icon: 'map', title: 'We know every region', description: 'North, Centre and South — our guides live in the places they take you to.' },
      { icon: 'wallet', title: 'Priced per group', description: 'Tell us how many people and what you want. We quote the whole trip, no hidden extras.' },
      { icon: 'clock', title: 'Answer within the hour', description: 'Office hours 8:00–20:00, seven days a week, by phone or Zalo.' },
      { icon: 'users', title: 'Guides, not couriers', description: 'Licensed guides who explain what you are looking at, in English or Vietnamese.' },
      { icon: 'headset', title: 'Reachable on the road', description: 'One number that stays the same before, during and after your trip.' },
      { icon: 'shield', title: 'Licensed and insured', description: 'Full international tour operator licence, with travel insurance on every departure.' },
    ],
  },
  tours: {
    overline: 'Our tours',
    heading: 'Six routes we run ourselves',
    description:
      'Every departure below is organised by our own team, not resold from another operator. Group sizes stay small enough to change plans when the weather does.',
    filters: { all: 'All regions', bac: 'North', trung: 'Centre', nam: 'South' },
    durationLabel: 'Duration',
    detailCta: 'See the itinerary',
    itineraryLabel: 'Day by day',
    quoteNote: 'Price depends on group size and season — call or message us for a quote.',
    items: [
      {
        slug: 'sapa-trek',
        region: 'bac',
        name: 'Sa Pa and the Muong Hoa valley on foot',
        province: 'Lao Cai',
        duration: '3 days, 2 nights',
        highlights: [
          'Two days walking between Hmong and Dao villages',
          'One night in a family homestay, one in Sa Pa town',
          'Guide from the valley who speaks the local language',
        ],
        itinerary: [
          { label: 'Day 1', detail: 'Night train or road from Hanoi, afternoon walk to Lao Chai.' },
          { label: 'Day 2', detail: 'Full day trek through Ta Van and Giang Ta Chai, homestay dinner.' },
          { label: 'Day 3', detail: 'Morning market, return to Hanoi in the evening.' },
        ],
        imageAlt: 'Trekkers walking with Hmong women on a hill path near Sa Pa',
      },
      {
        slug: 'halong-cruise',
        region: 'bac',
        name: 'Ha Long Bay overnight on a wooden junk',
        province: 'Quang Ninh',
        duration: '2 days, 1 night',
        highlights: [
          'Sleep on board, away from the day-trip crowds',
          'Kayaking into Luon cave at first light',
          'Maximum 16 guests per boat',
        ],
        itinerary: [
          { label: 'Day 1', detail: 'Board at midday, lunch under sail, kayak and swim, dinner on deck.' },
          { label: 'Day 2', detail: 'Sunrise over the karsts, cave visit, back on shore by early afternoon.' },
        ],
        imageAlt: 'Wooden junk with ochre sails among the limestone islands of Ha Long Bay',
      },
      {
        slug: 'phongnha-cave',
        region: 'trung',
        name: 'Phong Nha and Paradise Cave',
        province: 'Quang Binh',
        duration: '2 days, 1 night',
        highlights: [
          'Boat into Phong Nha cave along the Son river',
          'The first kilometre of Paradise Cave on foot',
          'Swim at Nuoc Mooc spring in the afternoon',
        ],
        itinerary: [
          { label: 'Day 1', detail: 'Son river boat into Phong Nha cave, afternoon at Nuoc Mooc spring.' },
          { label: 'Day 2', detail: 'Paradise Cave in the morning, back to Dong Hoi for the evening train.' },
        ],
        imageAlt: 'Lit stalactites and walkway inside Paradise Cave in Quang Binh',
      },
      {
        slug: 'hue-hoian',
        region: 'trung',
        name: 'Hue to Hoi An over the Hai Van pass',
        province: 'Thua Thien Hue · Quang Nam',
        duration: '4 days, 3 nights',
        highlights: [
          'Imperial citadel and two royal tombs in Hue',
          'Hai Van pass by road, stopping where the view earns it',
          'Two nights in the old town of Hoi An',
        ],
        itinerary: [
          { label: 'Day 1', detail: 'Arrive Hue, citadel in the afternoon, dinner by the Perfume river.' },
          { label: 'Day 2', detail: 'Tu Duc and Khai Dinh tombs, afternoon free.' },
          { label: 'Day 3', detail: 'Drive over the Hai Van pass, arrive Hoi An, lantern-lit evening.' },
          { label: 'Day 4', detail: 'Old town on foot, Japanese bridge, depart from Da Nang.' },
        ],
        imageAlt: 'The Japanese covered bridge in Hoi An reflected in the canal',
      },
      {
        slug: 'mekong-tour',
        region: 'nam',
        name: 'Cai Rang floating market and the delta',
        province: 'Can Tho',
        duration: '2 days, 1 night',
        highlights: [
          'On the water at 5:30, before the market thins out',
          'Night in a family guesthouse along a canal',
          'Rice-noodle workshop and fruit orchards',
        ],
        itinerary: [
          { label: 'Day 1', detail: 'Ho Chi Minh City to Can Tho, canal boat, dinner with the host family.' },
          { label: 'Day 2', detail: 'Early start for Cai Rang market, noodle workshop, return in the afternoon.' },
        ],
        imageAlt: 'Boats loaded with produce at the Cai Rang floating market',
      },
      {
        slug: 'dalat-tour',
        region: 'nam',
        name: 'Da Lat: flowers, coffee and pine forest',
        province: 'Lam Dong',
        duration: '3 days, 2 nights',
        highlights: [
          'A working coffee farm, from cherry to cup',
          'Flower gardens and the old railway station',
          'Cool nights — bring a jacket, even in July',
        ],
        itinerary: [
          { label: 'Day 1', detail: 'Arrive Da Lat, flower gardens, evening market.' },
          { label: 'Day 2', detail: 'Coffee farm and roastery, afternoon at Tuyen Lam lake.' },
          { label: 'Day 3', detail: 'Old railway station, Bao Dai palace, departure.' },
        ],
        imageAlt: 'Horse-drawn carriage beside flower beds in a Da Lat garden',
      },
    ],
  },
  destinations: {
    overline: 'Where we go',
    heading: 'Nine places we know well',
    description: 'All inside Vietnam. North, Centre and South — swipe to see them.',
    prevLabel: 'Previous destinations',
    nextLabel: 'Next destinations',
    items: [
      { slug: 'ha-long', name: 'Ha Long Bay', region: 'bac', tourCount: '4 tours', imageAlt: 'Limestone pillars rising from the water in Ha Long Bay' },
      { slug: 'sapa', name: 'Sa Pa', region: 'bac', tourCount: '3 tours', imageAlt: 'Green terraced fields in the Muong Hoa valley' },
      { slug: 'ninh-binh', name: 'Ninh Binh', region: 'bac', tourCount: '2 tours', imageAlt: 'Rowing boat entering a cave on the Trang An river' },
      { slug: 'hue', name: 'Hue', region: 'trung', tourCount: '3 tours', imageAlt: 'Ornate gate of the imperial citadel in Hue' },
      { slug: 'hoi-an', name: 'Hoi An', region: 'trung', tourCount: '5 tours', imageAlt: 'Yellow shophouses in the old town of Hoi An' },
      { slug: 'da-nang', name: 'Da Nang', region: 'trung', tourCount: '3 tours', imageAlt: 'The Dragon Bridge in Da Nang lit up at night' },
      { slug: 'phong-nha', name: 'Phong Nha', region: 'trung', tourCount: '2 tours', imageAlt: 'Cave mouth and green river at Phong Nha' },
      { slug: 'da-lat', name: 'Da Lat', region: 'nam', tourCount: '2 tours', imageAlt: 'Flower beds in a garden in Da Lat' },
      { slug: 'mekong', name: 'Mekong Delta', region: 'nam', tourCount: '3 tours', imageAlt: 'Produce boats on a Mekong delta waterway' },
    ],
  },
  clients: {
    overline: 'Who travels with us',
    heading: 'Companies that book with us every year',
    description:
      'Corporate retreats, incentive trips and family groups — most of our departures come from people who came back.',
    placeholderNote:
      'Placeholder — real client logos go here once we receive permission to display them.',
    items: [
      { id: 'client-1', name: 'Client logo 1' },
      { id: 'client-2', name: 'Client logo 2' },
      { id: 'client-3', name: 'Client logo 3' },
      { id: 'client-4', name: 'Client logo 4' },
      { id: 'client-5', name: 'Client logo 5' },
      { id: 'client-6', name: 'Client logo 6' },
    ],
  },
  testimonials: {
    overline: 'What travellers say',
    heading: 'In their own words',
    description: 'Feedback collected after each departure, published with the traveller\u2019s consent.',
    placeholderNote: 'Sample text \u2014 to be replaced with real reviews from our travellers.',
    prevLabel: 'Previous review',
    nextLabel: 'Next review',
    ratingLabel: '{n} out of 5 stars',
    items: [
      {
        id: 't1',
        quote:
          'The guide changed the route on the second morning because the weather turned, and it ended up being the best day of the trip. That kind of judgement is why we book with a local operator.',
        author: 'Traveller A',
        role: 'Placeholder \u2014 name and company pending',
        rating: 5,
      },
      {
        id: 't2',
        quote:
          'We travelled with two grandparents and a four-year-old. Everything was paced for us: shorter walks, earlier meals, a car never more than ten minutes away.',
        author: 'Traveller B',
        role: 'Placeholder \u2014 name and company pending',
        rating: 5,
      },
      {
        id: 't3',
        quote:
          'Twenty-two people from our office, three days, no one lost and no one complaining. The itinerary arrived a month early and did not change.',
        author: 'Traveller C',
        role: 'Placeholder \u2014 name and company pending',
        rating: 5,
      },
      {
        id: 't4',
        quote:
          'Answered on Zalo within minutes, every time, including the evening before departure when our flight moved.',
        author: 'Traveller D',
        role: 'Placeholder \u2014 name and company pending',
        rating: 4,
      },
      {
        id: 't5',
        quote:
          'What I remember is the food stops. None of them were on a tourist street, and the guide knew the owners by name.',
        author: 'Traveller E',
        role: 'Placeholder \u2014 name and company pending',
        rating: 5,
      },
    ],
  },
  gallery: {
    overline: 'From our trips',
    heading: 'Photos from the road',
    description: 'Tap any photo to see it full size.',
    openLabel: 'View photo full size',
    closeLabel: 'Close photo',
    prevLabel: 'Previous photo',
    nextLabel: 'Next photo',
    counterLabel: 'Photo {i} of {n}',
    items: [
      { slug: 'sapa-terraces', alt: 'Golden terraced rice fields on the hillsides of Sa Pa', caption: 'Terraced fields above the Muong Hoa valley, Sa Pa' },
      { slug: 'sapa-trek', alt: 'Footpath between terraced fields near Sa Pa', caption: 'Walking between villages, Lao Cai' },
      { slug: 'halong-cruise', alt: 'Wooden boat among the limestone islands of Ha Long Bay', caption: 'Overnight boat in Ha Long Bay' },
      { slug: 'phongnha-cave', alt: 'Lit cave chamber at Phong Nha', caption: 'Inside the caves of Quang Binh' },
      { slug: 'hoi-an-lanterns', alt: 'Lantern-lit street in the old town of Hoi An', caption: 'Lantern evening in Hoi An old town' },
      { slug: 'hue-hoian', alt: 'The Japanese covered bridge in Hoi An reflected in the canal', caption: 'The Japanese covered bridge, Hoi An' },
      { slug: 'mekong-tour', alt: 'Boats loaded with produce at the Cai Rang floating market', caption: 'Cai Rang floating market, Can Tho' },
      { slug: 'dalat-tour', alt: 'Flower beds in a garden in Da Lat', caption: 'Flower gardens, Da Lat' },
    ],
  },
  mobileBar: {
    call: 'Call now',
    zalo: 'Zalo',
    messenger: 'Message',
  },
};
