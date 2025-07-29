const channels = {
  news: [
    {
      name: 'ANTV',
      handle: '@antvtruyenhinhcongannhandan',
      url: 'https://www.youtube.com/@antvtruyenhinhcongannhandan',
      channelId: 'UCIg56SgvoZF8Qg0Jx_gh6Pg',
      category: 'news',
    },
    {
      name: 'Kênh Chuyên đề - Khoa giáo THTPCT',
      handle: '@chuyende-thtpct',
      url: 'https://www.youtube.com/@chuyende-thtpct/featured',
      channelId: 'UCr5vKhpFn-PujjRv3tX7w2w',
      category: 'news',
    },
    {
      name: 'VTV24',
      handle: '@vtv24',
      url: 'https://www.youtube.com/@vtv24/featured',
      channelId: 'UCabsTV34JwALXKGMqHpvUiA',
      category: 'news',
    },
    {
      name: 'Truyền hình Quảng Ngãi',
      handle: 'truyenhinhquangngai',
      url: 'https://www.youtube.com/truyenhinhquangngai',
      channelId: 'UCEQs1oUkzcxQcEvee_LeFLw',
      category: 'news',
    },
    {
      name: 'Báo Sức khỏe & Đời sống',
      handle: '@BaoSuckhoedoisongboyte',
      url: 'https://www.youtube.com/@BaoSuckhoedoisongboyte/featured',
      channelId: 'UCD09NCZlzMj4yGvGkLbuBpw',
      category: 'news',
    },
  ],

  // Chủ đề: Du lịch
  travel: [
    {
      name: 'Du lịch trải nghiệm',
      handle: '@familytravel_dulichtrainghiem',
      url: 'https://www.youtube.com/@familytravel_dulichtrainghiem/featured',
      channelId: 'UCD1RyxgnUw0H2y26NKJYMWQ',
      category: 'travel',
    },
    {
      name: 'Xẻo Travel',
      handle: '@Xeo_Travel',
      url: 'https://www.youtube.com/@Xeo_Travel/featured',
      channelId: 'UC210L7ZpJkpeTE6fR_Lltqw',
      category: 'travel',
    },
    {
      name: 'Gấu Ham Đi',
      handle: '@gauhamdi',
      url: 'https://www.youtube.com/@gauhamdi/featured',
      channelId: 'UC8ycREoB7vhqxBJvrDTRhoA',
      category: 'travel',
    },
    {
      name: 'Toro Pan',
      handle: '@Toro_Pan',
      url: 'https://www.youtube.com/@Toro_Pan/featured',
      channelId: 'UC6wnGZB5VGvdL0PeBXXo1fQ',
      category: 'travel',
    },
    {
      name: 'Khoai Lang Thang',
      handle: '@KhoaiLangThang',
      url: 'https://www.youtube.com/@KhoaiLangThang',
      channelId: 'UCZE88kYvCKUKjM-G0uc8Duw',
      category: 'travel',
    },
  ],

  video_tech: [
    {
      name: 'Film Riot',
      handle: '@filmriot',
      url: 'https://www.youtube.com/@filmriot',
      channelId: 'UC6iRiXq7NRjVBrPLKwIyeKg',
      category: 'video_tech',
    },
    {
      name: 'Cường - Làm Phim Nghiệp Dư',
      handle: '@cuonglpnd',
      url: 'https://www.youtube.com/@cuonglpnd',
      channelId: 'UCNeFntr5Y7Xc1GKYuMg8suQ',
      category: 'video_tech',
    },
    {
      name: 'Làm Phim Cùng Nam Trịnh',
      handle: 'L%C3%A0mPhimC%C3%B9ngNamTr%E1%BB%8Bnh',
      url: 'https://www.youtube.com/c/L%C3%A0mPhimC%C3%B9ngNamTr%E1%BB%8Bnh/videos',
      channelId: 'UCCcVPquyezXS7b1gqaJh90g',
      category: 'video_tech',
    },
    {
      name: 'Mean Tính',
      handle: '@tinh',
      url: 'https://www.youtube.com/@tinh/videos',
      channelId: 'UCdf4M016Bux66FP6bspfiiA',
      category: 'video_tech',
    },
    {
      name: 'Quạ HD',
      handle: '@quahd',
      url: 'https://www.youtube.com/@quahd/videos',
      channelId: 'UCdvMbVq9yesFYRSr-YmpgmQ',
      category: 'video_tech',
    },
  ],

  // Chủ đề: Lập trình
  programming: [
    {
      name: 'freeCodeCamp.org',
      handle: '@freecodecamp',
      url: 'https://www.youtube.com/@freecodecamp',
      channelId: 'UC8butISFwT-Wl7EV0hUK0BQ',
      category: 'programming',
    },
    {
      name: 'Dũng Lại Lập Trình',
      handle: '@dunglailaptrinh',
      url: 'https://www.youtube.com/@dunglailaptrinh',
      channelId: 'UCMYT8xymrm4VOP241b86MCQ',
      category: 'programming',
    },
    {
      name: 'K team',
      handle: '@KTeam',
      url: 'https://www.youtube.com/@KTeam/featured',
      channelId: 'UCBw4b26KZrBvHRPBjOCw6UQ',
      category: 'programming',
    },
    {
      name: 'SuperSimpleDev',
      handle: '@SuperSimpleDev',
      url: 'https://www.youtube.com/@SuperSimpleDev/featured',
      channelId: 'UCB6dvaWu0N8uVq2yKsZ5s5g',
      category: 'programming',
    },
    {
      name: 'Programming with Mosh',
      handle: '@programmingwithmosh',
      url: 'https://www.youtube.com/@programmingwithmosh/featured',
      channelId: 'UCWv7vMbMWH4-V0ZXdmDpPBA',
      category: 'programming',
    },
  ],

  tech_review: [
    {
      name: 'Vật Vờ Studio',
      handle: '@realvatvostudio',
      url: 'https://www.youtube.com/@realvatvostudio/featured',
      channelId: 'UCEeXA5Tu7n9X5_zkOgGsyww',
      category: 'tech_review',
    },
    {
      name: 'Unbox Therapy',
      handle: '@unboxtherapy',
      url: 'https://www.youtube.com/@unboxtherapy',
      channelId: 'UCsTcErHg8oDvUnTzoqsYeNw',
      category: 'tech_review',
    },
    {
      name: 'AnhEm TV',
      handle: '@anhemtv',
      url: 'https://www.youtube.com/@anhemtv/featured',
      channelId: 'UCDri2yZO_tqdD70bK-D7iQg',
      category: 'tech_review',
    },
    {
      name: 'relab',
      handle: '@relab2015',
      url: 'https://www.youtube.com/@relab2015/featured',
      channelId: 'UC7MGCyKDw8iQX7Vs0-BH9uA',
      category: 'tech_review',
    },
    {
      name: 'The Verge',
      handle: '@TheVerge',
      url: 'https://www.youtube.com/@TheVerge/videos',
      channelId: 'UCddiUEpeqJcYeBxX1IVBKvQ',
      category: 'tech_review',
    },
  ],
};

module.exports = {
  channels,
};
