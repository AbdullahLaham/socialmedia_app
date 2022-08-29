import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'
export const client = sanityClient({
  projectId: 'h6oe5zrt',
  dataset: 'production',
  apiVersion: '2022-08-15',
  useCdn: true,
  token: 'skpj1vcEc9yRxViA6lEUbZ5q9Qx25lqSiudilOWLPbXd56F9Su1z8QbT4trWN6Kq4l7p5cRqJpBKl0vktvpJ8spqX7b9hQy1Ly8GrcPyQ5Rta24KeuJZMHnuoQvIweXDSj7eAfGPw7uH72dFTCUKweOQSJucMmxBw4H5y9QhAbMi5ru1j8uW',
});
const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
  return builder.image(source)
}