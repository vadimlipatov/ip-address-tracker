export async function getAddress(ip = "8.8.8.8") {
  try {
    const request = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_GwEruOcmgAFiZ1bwuccK0hDKC7W41&ipAddress=${ip}`
    );
    return await request.json();
  } catch (error) {
    console.error(error.message);
  }
}
