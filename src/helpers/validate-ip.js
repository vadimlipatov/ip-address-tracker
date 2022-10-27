export function validateIP(ip) {
  if (
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(
      `${ip}`
    )
  ) {
    return true;
  } else {
    alert("Invalid IP");
    return false;
  }
}
