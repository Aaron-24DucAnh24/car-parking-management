import {
  FaPhoneAlt,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagramSquare,
  FaCopyright,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

import style from "./style.module.scss";

export default function Footer() {
  return (
    <div className={style.container}>
      <div className={style.firstRow}>
        <h2>Contact information</h2>
        <ul className={style.contactList}>
          <li className={style.contactItem}>
            <a href="tel:+84964778339">
              <span>
                <FaPhoneAlt />
              </span>
              <p>+84 964 778 339</p>
            </a>
          </li>
          <li className={style.contactItem}>
            <a href="mailto:buingocducanh24@gmail.com">
              <span>
                <IoMdMail />
              </span>
              <p>buingocducanh24@gmail.com</p>
            </a>
          </li>
          <li className={style.contactItem}>
            <div>
              <span>
                <MdLocationOn />
              </span>
              <p>District 10, Ho Chi Minh City</p>
            </div>
          </li>
        </ul>
        <ul className={style.socialList}>
          <li>
            <a
              rel="noreferrer"
              href="https://www.facebook.com/ngocducanh.bui"
              target="_blank"
              className={style.socialItem}
            >
              <FaFacebook />
            </a>
          </li>
          <li>
            <a
              rel="noreferrer"
              href="https://github.com/Aaron-24DucAnh24"
              target="_blank"
              className={style.socialItem}
            >
              <FaGithub />
            </a>
          </li>
          <li>
            <a
              rel="noreferrer"
              href="https://www.instagram.com/im_22_ducanh/"
              target="_blank"
              className={style.socialItem}
            >
              <FaInstagramSquare />
            </a>
          </li>
          <li>
            <a
              rel="noreferrer"
              href="https://www.linkedin.com/in/duc-anh-bui-2143b7275/"
              target="_blank"
              className={style.socialItem}
            >
              <FaLinkedin />
            </a>
          </li>
        </ul>
      </div>

      <hr />

      <div className={style.secondRow}>
        <FaCopyright />
        <p> Đức Anh Bùi. All Rights Reserved.</p>
      </div>
    </div>
  );
}
