import * as React from "react";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/actions";

function HomeScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = store.getState().authReducer["currentUser"]["username"];
  const tabs = ["posts", "albums"];
  const [datas, setDatas] = useState([]);
  const [type, setType] = useState("posts");
  const [searchItem, setSearchItem] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/${type}`)
      .then(function (response) {
        setDatas(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [type]);

  const totalPage = datas.length;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = datas.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers: any = [];
  for (let i = 1; i <= Math.ceil(totalPage / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumbers: any) => setCurrentPage(pageNumbers);

  console.log(pageNumbers);

  const handleSearchItem = (e: any) => {
    setSearchItem(e.target.value);

    axios
      .get(
        `https://jsonplaceholder.typicode.com/${type}?title_like=${e.target.value}`
      )
      .then(function (response) {
        setDatas(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <header>
        <Container className="py-2">
          <Row>
            <Col md={4}>
              <div className="logo">
                <p className="font-semibold text-5xl text-teal-500">News</p>
              </div>
            </Col>
            <Col md={4} className="flex justify-center">
              <Form>
                <input
                  className="border-2 border-black border-solid rounded px-4 py-2"
                  type="text"
                  placeholder="Search"
                  spellCheck={false}
                  onChange={handleSearchItem}
                />
              </Form>
            </Col>
            <Col md={4} className="header-right">
              <div className="flex justify-center items-center">
                <p>
                  <span className="text-lg font-semibold text-teal-400">
                    Hello: {username ? username : ""}
                  </span>
                </p>
                <p
                  className="cursor-pointer px-3 py-2 rounded-md bg-teal-400 ml-1 hover:bg-teal-500 w-fit"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <div className="wp-body">
        <Container>
          <ul className="flex justify-center text-xl">
            {tabs.map((tab) => (
              <li key={tab}>
                <button
                  className={
                    type === tab ? `bg-teal-500 px-4 py-2 rounded` : "px-4 py-2"
                  }
                  onClick={() => setType(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
          <ul>
            {currentPosts.map((data) => (
              <li className="border px-2 py-1" key={data["id"]}>
                {data["title"] || data["name"]}
              </li>
            ))}
          </ul>

          <div>
            <ul className="flex justify-center ">
              {pageNumbers.map((number: number) => (
                <li
                  className="border px-2 py-1 hover:bg-teal-500 rounded cursor-pointer mx-1"
                  onClick={() => paginate(number)}
                >
                  {number}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default HomeScreen;
