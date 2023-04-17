import React, { useState } from 'react'
import { FaAngleDown, FaMusic, FaPhotoVideo, FaRegWindowClose, FaTextHeight, FaTools } from 'react-icons/fa'
import style from 'src/styles/pages/dashboard/sidebar.module.scss'
import Form from 'react-bootstrap/Form'

const Sidebar = () => {
  const [isToggleMenu, setIsToggleMenu] = useState(false)

  return (
    <div>
      <div className={`${style.side_bar_main_div}`}>
        <div className={`${style.menu_box}`} onClick={() => setIsToggleMenu(!isToggleMenu)}>
          <div>
            <FaPhotoVideo /> <label>Projects</label>
          </div>
          <FaAngleDown />
        </div>
        <div className={`${style.menu_box}`}>
          <div>
            <FaPhotoVideo /> <label>Footage</label>
          </div>
          <FaAngleDown />
        </div>
        <div className={`${style.menu_box}`}>
          <div>
            <FaPhotoVideo /> <label>Photos</label>
          </div>
          <FaAngleDown />
        </div>
        <div className={`${style.menu_box}`}>
          <div>
            <FaMusic /> <label>Music</label>
          </div>
          <FaAngleDown />
        </div>
        <div className={`${style.menu_box}`}>
          <div>
            <FaTextHeight /> <label>Text</label>
          </div>
          <FaAngleDown />
        </div>
        <div className={`${style.menu_box}`}>
          <div>
            <FaPhotoVideo /> <label>Canvas</label>
          </div>
          <FaAngleDown />
        </div>
        <div className={`${style.menu_box}`}>
          <div>
            <FaTools /> <label>Settings</label>
          </div>
          <FaAngleDown />
        </div>

        {isToggleMenu ? (
          <div className={`${style.sidebar_menu_items_div}`}>
            <div className={`${style.header_div}`}>
              <h5>Projects</h5>
              <FaRegWindowClose />
            </div>
            <div className={`${style.search_div}`}>
              <Form.Control type='text' placeholder='search...' />
            </div>
            <div className={`${style.scroll_div}`}>
              <div className={`${style.items_list_div}`}>
                <h6>Uploads</h6>
                <div className={`${style.items_list_flex_box}`}>
                  <div className={`${style.items_box}`}></div>
                  <div className={`${style.items_box}`}></div>
                  <div className={`${style.items_box}`}></div>
                </div>
              </div>
              <div className={`${style.items_list_div}`}>
                <h6>Videos</h6>
                <div className={`${style.items_list_flex_box}`}>
                  <div className={`${style.items_box}`}></div>
                  <div className={`${style.items_box}`}></div>
                  <div className={`${style.items_box}`}></div>
                </div>
              </div>
              <div className={`${style.items_list_div}`}>
                <h6>Audio</h6>
                <div className={`${style.items_list_flex_box}`}>
                  <div className={`${style.items_box}`}></div>
                  <div className={`${style.items_box}`}></div>
                  <div className={`${style.items_box}`}></div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Sidebar
