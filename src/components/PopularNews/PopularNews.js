import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card} from "react-bootstrap";
import React from "react";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";

import {latestNewsListAction} from "../../actions/latestNewsAction";

export default function PopularNews() {

    const dispatch = useDispatch();

    const latestNewsList = useSelector(state => state.latestNewsList);
    const {loading, error, success, latestNews} = latestNewsList;

    useEffect(() => {
        dispatch(latestNewsListAction())
    }, [dispatch])

    return (
        <div>
            {loading ? <Loader/>
                : error ? <Message variant="danger">{error}</Message>
                    : (
                        <Card className="news__card">
                            {success ? latestNews.articles.map(news => (
                                <div>
                                    <Card.Img src={news.urlToImage}/>
                                    <Card.Body>
                                        <Card.Title>
                                            {news.title}
                                        </Card.Title>
                                        <Card.Text>
                                            {news.description}
                                        </Card.Text>
                                        <Button href={news.url} target="_blank" variant="primary">Read more</Button>
                                    </Card.Body>
                                </div>
                            )) : <div/>}
                        </Card>
                    )}
        </div>
    )
}