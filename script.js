// Object mapping categories to their dork queries
const dorkQueries = {
    "WordPress": (domain) => `site:${domain} inurl:wp- | inurl:wp-content | inurl:wp-admin | inurl:wp-login.php | inurl:wp-includes | inurl:plugins | inurl:uploads | inurl:themes | inurl:xmlrpc.php | inurl:wp-json/ | inurl:wp-config.php | inurl:readme.html | inurl:license.txt | inurl:xmlrpc.php | inurl:wp-trackback.php | inurl:wp-comments-post.php | inurl:wp-settings.php | inurl:wp-load.php`,
    "SQL Injection": (domain) => `site:${domain} inurl:index.php?id= | inurl:page.php?id= | inurl:item.php?id= | inurl:view.php?id= | inurl:product.php?id= | inurl:/article?id= | inurl:/news?id= | inurl:/?id= | inurl:/page?id= | inurl:search.php?q= | inurl:"error in your SQL syntax"`,
    "Joomla": (domain) => `site:${domain} inurl:/administrator/ | inurl:/components/ | inurl:/modules/ | inurl:/plugins/ | inurl:/templates/ | inurl:/language/ | inurl:/index.php?option=com_ | inurl:/user/ | inurl:/content/ | inurl:/cache/`,
    "Web3": (domain) => `site:${domain} inurl:/.well-known/ | inurl:/api/ | inurl:/eth/ | inurl:/web3/ | inurl:/rpc/ | inurl:/contract/ | inurl:/v3/ | inurl:/token/ | inurl:/tx/ | inurl:/blockchain/`,
    "Swagger API": (domain) => `site:${domain} inurl:/swagger/ | inurl:/api-docs/ | inurl:/swagger-ui/ | inurl:/swagger.json | inurl:/swagger.yaml | inurl:/openapi/ | inurl:/docs/api/ | inurl:/api/v1/ | inurl:/v2/api-docs/ | inurl:/rest/`,
    "Laravel" : (domain) => `intext:"PHP DEBUGBAR" intext:"login" site:${domain} inurl:/login intext:php laravel debugbar`,
    "LFI": (domain) => `site:${domain} inurl:/index.php?page= | inurl:/include/ | inurl:/../ | inurl:/config/ | inurl:/etc/ | inurl:/proc/self/environ | inurl:/var/log/ | inurl:/lib/ | inurl:/boot/ | inurl:/home/`,
    "Files and Juicy Files": (domain) => `site:${domain} inurl:/admin/ | inurl:/backup/ | inurl:/config/ | inurl:/data/ | inurl:/db/ | inurl:/secret/ | inurl:/private/ | inurl:/confidential/ | inurl:/files/ | inurl:/uploads/`,
    "Program and Bug Bounty": (domain) => `site:${domain} inurl:/bugbounty/ | inurl:/program/ | inurl:/challenges/ | inurl:/vulnerability/ | inurl:/security/ | inurl:/report/ | inurl:/bug/ | inurl:/security-advisory/ | inurl:/findings/`,
    "Admin Panel": (domain) => `site:${domain} inurl:/admin/ | inurl:/login/ | inurl:/dashboard/ | inurl:/administrator/ | inurl:/wp-admin/ | inurl:/cpanel/ | inurl:/manager/ | inurl:/admin-console/ | inurl:/control-panel/ | inurl:/admin-login/`,
    "Portal": (domain) => `site:${domain} inurl:/portal/ | inurl:/login/ | inurl:/user/ | inurl:/account/ | inurl:/signin/ | inurl:/register/ | inurl:/profile/ | inurl:/dashboard/ | inurl:/member/ | inurl:/session/`,
    "API Keys": (domain) => `site:${domain} inurl:/api/ | inurl:/keys/ | inurl:/tokens/ | inurl:/auth/ | inurl:/client_id/ | inurl:/access_key/ | inurl:/api_key/ | inurl:/secret_key/ | inurl:/config/`,
    "SSH Keys": (domain) => `site:${domain} inurl:/ssh/ | inurl:/keys/ | inurl:/private/ | inurl:/id_rsa/ | inurl:/authorized_keys/ | inurl:/sshd_config/ | inurl:/etc/ssh/ | inurl:/root/.ssh/ | inurl:/home/.ssh/`,
    "Configuration Files": (domain) => `site:${domain} inurl:/config/ | inurl:/settings/ | inurl:/conf/ | inurl:/configurations/ | inurl:/app_config/ | inurl:/config.json | inurl:/config.yml | inurl:/config.php | inurl:/etc/ | inurl:/config.xml`,
    "Unsecured File Uploads": (domain) => `site:${domain} inurl:upload | inurl:/upload/ | inurl:/uploads/ | inurl:/fileupload/ | inurl:/file/ | inurl:/imageupload/ | inurl:/fileuploads/ | inurl:/media/ | inurl:/images/ | inurl:/documents/`,
    "Misconfigured Cloud Storage": (domain) => `site:aws.amazon.com inurl:${domain} -inurl:login | site:*.s3.amazonaws.com | inurl:/public/ | inurl:/bucket/ | inurl:/private/ | inurl:/open/ | inurl:/data/ | inurl:/files/ | inurl:/documents/ | inurl:/storage/`,
    "Sensitive Company Information": (domain) => `filetype:ppt "company name" site:${domain} | filetype:pdf "company name" site:${domain} | filetype:xls "company name" site:${domain} | inurl:"/financial/" | inurl:"/internal/" | inurl:"company report" | inurl:"confidential" | inurl:"private"`,
    "Vulnerable Software Versions": (domain) => `intext:"version 1.0" site:${domain} | intext:"version 2.0" site:${domain} | intext:"vulnerable" site:${domain} | intext:"exploit" site:${domain} | inurl:"/version/" | inurl:"/release/"`,
    "Social Security Numbers": (domain) => `intext:"social security number" site:${domain} | intext:"SSN" site:${domain} | inurl:"/social-security/" | inurl:"/taxes/" | inurl:"/personal-info/" | inurl:"/customer-details/"`,
    "Unprotected Archives": (domain) => `filetype:zip site:${domain} | filetype:rar site:${domain} | filetype:tar.gz site:${domain} | filetype:7z site:${domain} | inurl:/backup/ | inurl:/archived/ | inurl:/files/ | inurl:/archives/ | inurl:/compressed/`,
    "Online Databases": (domain) => `inurl:database site:${domain} | inurl:/db/ | inurl:/database/ | inurl:/sql/ | inurl:/data/ | inurl:/mysql/ | inurl:/postgres/ | inurl:/no-sql/`,
    "Web Server Information": (domain) => `intitle:"Apache Status" site:${domain} | intitle:"nginx" site:${domain} | intitle:"server-status" site:${domain} | inurl:/server-status/ | inurl:/server-info/ | inurl:/status/ | inurl:/server-status?auto=on/`,
    "Unprotected Webcams": (domain) => `inurl:viewerframe?mode=stream site:${domain} | inurl:/camera/ | inurl:/stream/ | inurl:/webcam/ | inurl:/view/ | inurl:/video/ | inurl:/live/ | inurl:/watch/`,
    "S3 Buckets (Amazon)": (domain) => `site:s3.amazonaws.com inurl:${domain} | site:*.s3.amazonaws.com | intext:"Access Denied" site:s3.amazonaws.com | inurl:/bucket/ | inurl:/public/ | inurl:/open/ | inurl:/files/ | inurl:/data/`,
    "GitHub Dorks": (domain) => `site:github.com "password" -inurl:login | site:github.com "secret" | site:github.com "api_key" | site:github.com "token" | site:github.com "private" | site:github.com "confidential" | site:github.com "credentials"`,
    "Azure Dorks": (domain) => `site:dev.azure.com -inurl:login | site:blob.core.windows.net | intext:"secret" site:dev.azure.com | site:*.azurewebsites.net | inurl:/devops/ | inurl:/pipelines/ | inurl:/vsts/`,
    "Pastebin Dorks": (domain) => `site:pastebin.com site:${domain} | site:pastebin.com "password" site:${domain} | site:pastebin.com "token" site:${domain} | site:pastebin.com "email" site:${domain}`
};


// Event listener for clicking a category logo
document.querySelectorAll(".category-logo").forEach(function (logo) {
    logo.addEventListener("click", function () {
        const category = logo.getAttribute("data-category");
        const domain = document.getElementById("domainInput").value.trim();

        // Generate dork
        const dork = dorkQueries[category](domain);
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(dork)}`;

        // Open the search URL in a new tab
        window.open(searchUrl, '_blank');
    });
});
