import { ENDPOINTS } from '@/API/endpoints';
import ProductPage from '@/components/products/productPage/ProductPage';
import { getSession } from '@/lib/lib';
import { Container } from '@chakra-ui/react';
import { notFound, redirect } from 'next/navigation';


export async function generateMetadata({ params, searchParams }, parent) {
  try {
    const res = await fetch(`https://namito.tatadev.pro/api/product-seo/${params.id}/`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const meta = await res.json();
      const previousImages = (await parent).openGraph?.images || [];

      return {
        title: meta.meta_title,
        description: meta.meta_description,
        openGraph: {
          description: meta.meta_description,
          title: meta.meta_title,
          images: [{ url: meta.meta_image }, ...previousImages],
        },
      };
    }
  } catch (error) {
    console.error(error); // Log error for debugging
  }
}

async function fetchData(headers, url) {
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: headers,
    });

    if (res.ok) {
      return await res.json();
    } else {
      console.error(`Error fetching data from ${url}: ${res.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
    return null;
  }
}

export default async function Page({ params }) {
  const session = await getSession();
  const token = session?.access_token;

  const headers = {
    'Accept-Language': `${params.locale}`,
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const product = await fetchData(headers, ENDPOINTS.getProductData(params.id));
  const similarProds = await fetchData(headers, ENDPOINTS.getSimilarProducts(params.id)) || [];

  if (!product) {
   redirect('/not-found')
  }

  return (
    <Container
      maxW={{ base: '100%', lg: '1200px', xl: '1280px', '2xl': '1440px' }}
      px={'0'}
>
        <ProductPage
          params={params}
          details={product}
          similarProds={similarProds}
        />
    </Container>
  );
}
