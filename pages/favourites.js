import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from "@/components/ArtworkCard";

function Favourites() {
  const [favouriteList, setFavouritesList] = useAtom(favouritesAtom);

  if (!favouriteList) return null;

  if (favouriteList) {
    return (
      <>
        <Row className="gy-4">
          {favouriteList.length > 0 ? (
            favouriteList.map((objID) => (
              <Col lg={3} key={objID}>
                <ArtworkCard objectID={objID} />
              </Col>
            ))
          ) : (
            <Col>
              <Card>
                <Card.Body>

                  <h4>Nothing Here</h4>
                  Try adding some new artwork to the list.

                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </>

    );
  }


}
export default Favourites;

