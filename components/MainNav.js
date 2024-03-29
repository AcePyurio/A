import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";

import { addToHistory } from "@/lib/UserData";
import { readToken, removeToken } from "@/lib/authenticate";

import { getToken } from "@/lib/authenticate";



export default function MainNav() {

  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();

  const submitForm = async (e) => {
    e.preventDefault();
    if (searchField !== "") {
      const queryString = `title=true&q=${searchField}`;
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
      router.push(`/artwork?${queryString}`);
      setSearchField("");
    }
  };

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push('/login');
  }

  let token = readToken();

  console.log('MAINAV TOKEN = ', token);


  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>John Paul Alvarez</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={(e) => setIsExpanded(!isExpanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/"} >Home </Nav.Link></Link>

              <Link href="/search" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/search"} >Advanced Search</Nav.Link></Link>

            </Nav>
            &nbsp;

            <Form className="d-flex" onSubmit={submitForm}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField} onChange={(e) => setSearchField(e.target.value)}
              />
              <Button type="submit" variant="success">Search</Button>
            </Form>

            &nbsp;

            <Nav>

              <NavDropdown title={token ? token.userName || "User Name" : "User Name"} id="basic-nav-dropdown"  >
                <Link href="/favourites" passHref>
                  <NavDropdown.Item onClick={() => setIsExpanded(false)} active={router.pathname === "/favourites"} >
                    <Link href="/favourites">
                      Favourites
                    </Link>
                  </NavDropdown.Item>
                </Link>

                <Link href="/history" passHref>
                  <NavDropdown.Item onClick={() => setIsExpanded(false)} active={router.pathname === "/history"} >
                    <Link href="/history">
                      History
                    </Link>
                  </NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>

            </Nav>

            <Nav >
              <Link href="/register" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/register"} >register </Nav.Link></Link>
              <Link href="/login" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/login"} >login </Nav.Link></Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar >
      <br /><br /><br />
    </>
  );
}
