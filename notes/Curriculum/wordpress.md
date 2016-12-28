
Book: *WordPress: The Missing Manual*

# Lesson #1 - Setting up Wordress Blog

## How WordPress Works

* Browsers ask web servers for web pages
* sometimes web servers return static web pages
* but web servers can also execute computer code that generates a web page to return to the browser. This is called a *dynamic* web page.
* WordPress is a computer program written in PHP that can be used to create a dynamic website, typically a blog.
```html
<html>
<body>
    <ul>
        <?php
        $i = 1;
        while ($i <= 10) {
            echo '<li>Item ' . $i . '</li>';
            $i = $i + 1;
        }
        ?>
    </ul>
</body>
</html>
```
* The content of a WordPress site is stored in a *database*.  A database has tables in which it store different kinds of data.  In particular, WordPress uses the *MySQL* database which is a *relational database*. In relational database the tables of data are related to each other.

## Installing WordPress

* Where to install?
    * root folder
    * subfolder
    * subdomain
* Installation process
    * Create the MySQL database
    * Copy in the WordPress files
    * Run the WordPress installation script
* Run through the installation on Webfaction
* Keeping WordPress up to date
    * The dashboard will let you know about updates
    * It's important to stay up to date for security reasons!

## Setting up Wordpress
* Dashboard -> Settings - title, tagline, timezone
* Settings -> Permalink
* Appearance -> Themes
    * can install from 1,000+ themes
    * Theme customizer - Appearance -> Customize
* Appearance -> Widgets

## Writing Blog Posts
* 1 category per post, multiple tags
* can have sticky posts
* Media library - where images and other media are stored

## Mobile Apps
* Setting up mobile app for blog posting

