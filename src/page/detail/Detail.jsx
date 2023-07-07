import React from "react";
import { useParams , useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import pexelsApi from "../../api/pexelsApi";
import "./detail.css";

function Detail() {
  const [item, setItem] = useState();
  const { id } = useParams();
  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let response = null;
      const params = { page: 1 };
      switch (category) {
        case "v1":
          response = await pexelsApi.getImageById(id, { params });
          break;
        case "videos":
          response = await pexelsApi.getVideoById(id, { params });
          break;
        default:
          response = "";
          break;
      }
      setItem(response);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className=" mb-3">
        <div className="detail">
            {
                item !== undefined ? (
                    category === 'v1' ? (
                        <ContentImage item={item} />
                    ):(
                        <ContentVideo item={item} />
                    )
                ):null
            }
        </div>
      </div>
    </div>
  );
}

const ContentImage = (props) => {
  const item = props.item;
  const downloads = item.src
  const navigate = useNavigate()

  const downloadImg = (url) => {
    fetch(url)
        .then(res => res.blob())
        .then(file => {
            const a = document.createElement('a')
            a.href = URL.createObjectURL(file)
            a.download = new Date().getTime()
            a.click()
        })
        .catch(() => console.log('Failed'))
}
  
  return (
    <div className="detail-content">
      <div className="detail-content-header">
        <div className="detail-content-header-title">
          <button onClick={() => navigate(-1)}>
              <i className="fa-solid fa-angle-left"></i>
          </button>
          <h2>{item.photographer}</h2>
        </div>
        <div className="detail-content-header-control">
          <div className="button-down">
            <button className="button-down-btn">Download Free</button>
            <div className="button-down-select">
            {
              Object.keys(downloads).map((name, i) => (
               <a url={downloads[name]}  key={i} onClick={() => downloadImg(downloads[name])}>{name}</a>
              ))
            }
            </div>
          </div>
        </div>
      </div>

      <div className="detail-content-preview-img">
        <div className="img">
          <img src={item.src.original} alt="" />
        </div>
      </div>
      <div className="detail-content-dsc">
        <div className="detail-content-dsc-size">
          {`Size : ${item.height} x ${item.width}`}
        </div>
        <div className="detail-content-dsc-color">
          <span className="detail-content-dsc-color-title">Color</span>
          <div className="detail-content-dsc-color-box" style={{backgroundColor: `${item.avg_color}` }}></div>
        </div>
      </div>
    </div>
  );
};

const ContentVideo = (props) => {
  const item = props.item;
  const downloads = item.video_files
  const navigate = useNavigate()
  console.log(downloads);

  let urlVideoHD = null;

  item.video_files.map(item => {
        if(item.quality === 'hd'){
            urlVideoHD = item.link
        }
  })

    const downloadVideos = (url) => {
      fetch(url)
          .then(res => res.blob())
          .then(file => {
              const a = document.createElement('a')
              a.href = URL.createObjectURL(file)
              a.download = new Date().getTime()
              a.click()
          })
          .catch(() => console.log('Failed'))
  }

  return (
    <div className="detail-content">
      <div className="detail-content-header">
        <div className="detail-content-header-title">
          <button onClick={() => navigate(-1)}>
              <i className="fa-solid fa-angle-left"></i>
          </button>
          <h2>{item.user.name}</h2>
        </div>
        <div className="detail-content-header-control">
          <div className="button-down">
            <button className="button-down-btn">Download Free</button>
            <div className="button-down-select">
              {
                downloads.map((download,i) => (
                  <a key={i} onClick={() => downloadVideos(download.link)}>
                    {download.quality}
                    <span>{download.height} x {download.width}</span>
                  </a>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      <div className="detail-content-preview-img">
        <div className="img">
            <video autoPlay={true} controls  src={urlVideoHD}></video>
        </div>
      </div>
    </div>
  );
};

export default Detail;
