# Password Checker

Credit to https://haveibeenpwned.com for API to pwned password data source.

A safer Internet for the win!

The Password Checker hashes your password and sends the first 5 characters of that hash to the pwned passwords API. It then gets back a list of possible matches and compares your password to that list. Since no part of your actual password is ever sent over the Internet, and the full hash isn't sent either, neither the API nor anyone intercepting traffic in between will know what you have actually typed into the box.  Check out https://haveibeenpwned.com/FAQs for more information.