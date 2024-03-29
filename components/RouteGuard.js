import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { favouritesAtom } from '@/store';
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { getFavourites, getHistory } from '@/lib/UserData';
import { isAuthenticated } from '@/lib/authenticate';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

export default function RouteGuard(props) {
    const router = useRouter();

    const [favouriteList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);


    useEffect(() => {
        updateAtoms()
        // on initial load - run auth check
        authCheck(router.pathname);

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };
    }, []);

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!PUBLIC_PATHS.includes(path)) {
            console.log(`trying to request a secure path: ${path}`);
        }
    }

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }


    return <>{props.children}</>
}