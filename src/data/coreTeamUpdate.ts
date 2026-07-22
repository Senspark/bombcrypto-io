import core1 from 'src/assests/updateCoreTeam/LamHo.png';
import core2 from 'src/assests/updateCoreTeam/ThuanLe.webp';
import core3 from 'src/assests/updateCoreTeam/HaiHoang.png';
import core4 from 'src/assests/updateCoreTeam/KhuongPham.png';
import core5 from 'src/assests/updateCoreTeam/NhungVo.png';
// import core6 from 'src/assests/updateCoreTeam/HuanNguyen.png';
import core7 from 'src/assests/updateCoreTeam/HungNguyen.png';
// import advisor1 from 'src/assests/updateCoreTeam/ThaiDuong.png';
import advisor2 from 'src/assests/updateCoreTeam/TruongDo.png';
import advisor3 from 'src/assests/updateCoreTeam/EricVuong.webp';

type CoreTeam = {
  image: any;
  href: string;
  target: string;
  label?: string;
};

type Advisor = Partial<CoreTeam>;

export const coreTeam: CoreTeam[] = [
  {
    image: core1,
    target: '_blank',
    label: 'Twitter >>',
    href: 'https://twitter.com/lahm_ho',
  },
  {
    image: core2,
    target: '_blank',
    href: 'https://www.linkedin.com/in/thuan-le-917a2b236/',
  },
  {
    image: core3,
    target: '_blank',
    href: 'https://www.linkedin.com/in/hai-hoang-799348125/',
  },
  {
    image: core4,
    target: '_blank',
    href: 'https://www.linkedin.com/in/khuongpham/',
  },
  {
    image: core5,
    target: '_blank',
    href: 'https://www.linkedin.com/in/nhungvo93',
  },
  // {
  //   image: core6,
  //   target: '_blank',
  //   href: 'https://www.linkedin.com/in/huannguyen-b71456139/',
  // },
  {
    image: core7,
    target: '_blank',
    href: 'https://www.linkedin.com/in/hung-nguyen-phat-581348226/',
  },
];

export const advisor: Advisor[] = [
  // {
  //   image: advisor1,
  //   target: '_blank',
  //   href: 'https://www.linkedin.com/in/thaidn',
  // },
  {
    image: advisor2,
    target: '_blank',
    href: 'https://www.linkedin.com/in/truong-do-bab76122',
  },
  {
    image: advisor3,
    target: '_blank',
    href: 'https://www.linkedin.com/in/trustpayvn',
  },
];
