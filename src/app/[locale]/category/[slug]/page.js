import React, { Suspense } from 'react';
import { ENDPOINTS } from '@/API/endpoints';
import { notFound, redirect } from 'next/navigation';
import { getSession } from '@/lib/lib';
import CategoryCover from '@/components/categories/CategoryCover';
import { Flex } from '@chakra-ui/react';
import Loading from './loading';

const baseURL = "https://namito.tatadev.pro/api/products";
const buildQueryString = (params) => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};
let filteredData = [];


async function getFilteredProducts(url, headers) {
  const res = await fetch(url, {
    cache: 'no-store',
    headers: headers,
  });

  if (!res.ok) {
    console.error('Failed to fetch filtered products:', res.statusText);
    return [];
  }

  const filteredResData = await res.json();
  return filteredResData;
}

const page = async ({ params, searchParams }) => {
  const { slug } = params;
  const session = await getSession();
  const token = session?.access_token;
  const headers = {
    'Accept-Language': `${params.locale}`,
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Fetch category data
  const categoryRes = await fetch(`${ENDPOINTS.getCategoryData(slug)}`, {
    cache: 'no-store',
    headers: headers,
  });

  if (!categoryRes.ok) {
    notFound();
    return null;
  }

  const categoryData = await categoryRes.json();
  const [data] = categoryData;

  if (!data) {
    redirect('/not-found');
  }

  // Build query string for filtered products
  const queryString = buildQueryString(searchParams);


  if (queryString) {
    const url = `${baseURL}?${queryString}`;
    filteredData = await getFilteredProducts(url, headers);
  } else {
    filteredData = data
  }



  return (
<Suspense fallback={<Loading />}>

    <Flex flexGrow={1}>
      <CategoryCover
        data={data}
        params={params}
        filteredProductsData={filteredData?.products}
        token={session ? token : undefined}
      />
    </Flex>
</Suspense>

  );
};

export default page;
