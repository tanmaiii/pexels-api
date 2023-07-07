import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import "./list.css";
import pexelsApi, { category } from "../../api/pexelsApi";
import { motion, AnimatePresence } from "framer-motion";

function List(props) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(0);
  const [loadDis, setLoadDis] = useState(false);
  const keyword = props.keyword || undefined;

  useEffect(() => {
    const fetchData = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = { page: page };
        switch (props.type) {
          case category.v1:
            response = await pexelsApi.getImageList({ params });
            break;
          case category.videos:
            response = await pexelsApi.getVideoList({ params });
            break;
          default:
            response = "";
            break;
        }
      } else {
        const params = { page: page, query: keyword };
        switch (props.type) {
          case category.v1:
            response = await pexelsApi.search(category.v1, { params });
            break;
          case category.videos:
            response = await pexelsApi.search(category.videos, { params });
            break;
          default:
            response = "";
            break;
        }
      }

      if (props.type === "v1") {
        setItems(response.photos);
      } else {
        setItems(response.videos);
      }
      setPerPage(response.per_page);
    };
    fetchData();
  }, [keyword, props.type]);

  const loadMore = async () => {
    setLoadDis(true);
    let response = null;
    if (keyword === undefined) {
      const params = { page: page + 1 };
      switch (props.type) {
        case category.v1:
          response = await pexelsApi.getImageList({ params });
          break;
        case category.videos:
          response = await pexelsApi.getVideoList({ params });
          break;
        default:
          response = "";
          break;
      }
    } else {
      const params = { page: page + 1, query: keyword };
      switch (props.type) {
        case category.v1:
          response = await pexelsApi.search(category.v1, { params });
          break;
        case category.videos:
          response = await pexelsApi.search(category.videos, { params });
          break;
        default:
          response = "";
          break;
      }
    }

    if (props.type === "v1") {
      setItems([...items, ...response.photos]);
    } else {
      setItems([...items, ...response.videos]);
    }
    setLoadDis(false);
    setPage(page + 1);
  };

  return (
    <>
      {items.length === 0 ? (
        <div className="list-length-0">
          Bummer :( we couldn't find anything. Try something else.
        </div>
      ) : (
        <motion.div layout className="list">
          <AnimatePresence>
            {props.type === "v1"
              ? items.map((item, i) => (
                  <Card type={props.type} key={i} item={item} />
                ))
              : items.map((item, i) => (
                  <CardVideo type={props.type} key={i} item={item} />
                ))}
          </AnimatePresence>
        </motion.div>
      )}
      {
        items.length === 0 ? (
            <></>
        ): (page < perPage ? (
                <div className="load-more" onClick={loadMore}>
                  <button disabled={loadDis}>
                    {loadDis ? "Loading..." : "Load More"}
                  </button>
                </div>
            ) : null
        )
      }
    </>
  );
}

function Card(props) {
  const item = props.item;
  const type = props.type;
  const navigate = useNavigate();
  const imgDown = item.src.original;

  const downloadImg = () => {
    fetch(imgDown)
      .then((res) => res.blob())
      .then((file) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
      })
      .catch(() => console.log("Failed"));
  };

  return (
    <motion.div
      className="card"
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={item.src.large}
        onClick={() => navigate("/v1/detail/" + item.id)}
      />

      <div className="card_body">
        <div className="card_body_name">
          <span>{item.photographer}</span>
        </div>
        <div className="card_body_down">
          <button onClick={downloadImg}>
            <i className="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CardVideo(props) {
  const item = props.item;
  const type = props.type;
  const [isHoverd, setIsHovered] = useState(false);
  const navigate = useNavigate();

  let urlVideoSD = null;
  let urlVideoHD = null;

  item.video_files.map((item) => {
    if (item.quality === "sd") {
      urlVideoSD = item.link;
    }
    if (item.quality === "hd") {
      urlVideoHD = item.link;
    }
  });

  const downloadVideo = () => {
    fetch(urlVideoHD)
      .then((res) => res.blob())
      .then((file) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
      })
      .catch(() => console.log("Failed"));
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="card cardVideos"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <div
            className="cardVideos_img"
            onClick={() => navigate("/videos/detail/" + item.id)}
        >
            {isHoverd && (
            <video autoPlay loop muted="none" src={urlVideoSD}></video>
            )}
            <img src={item.image} alt="" />
        </div>
        <div className="card_body">
            <div className="card_body_name">
            <span>{item.user.name}</span>
            </div>
            <div className="card_body_down" onClick={downloadVideo}>
            <button>
                <i className="fa-solid fa-download"></i>
            </button>
            </div>
        </div>
    </motion.div>
  );
}

List.propTypes = {
    keyword: PropTypes.string,
    typeof: PropTypes.string,
};

export default List;
