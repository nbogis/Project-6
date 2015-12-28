/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            // test if allFeeds variable in app.js is defined and its size isn't 0
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        allFeeds.forEach(function(feed) {
            it('has a defined URL',function() {
                // test if the URL of each elements in allFeeds is defined and its size isn't 0
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        })


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        allFeeds.forEach(function(feed) {
            it('has a defined name',function() {
                // test if each of the elements in allFeeds has a defined name that is not empty string
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        })
    });

    
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         // get the class name of Dom's body
         var body = document.body.className;
         it('should be hidden by default', function() {
            // check if the class name is menu-hidden
            // this tests if menu-hidden exist which means that the menu is hidden
            // 'menu-hidden' class disappear when the menu shows up
            expect(body).toBe('menu-hidden');
         })

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('menu should be displayed when it first clicked', function() {
            // menu-icon-link is the class that relates to the clicked DOM
            // we click it 'menu-hidden' class disappears
            $('.menu-icon-link').click();
            expect(document.body.className).toBe('');
            
            // we click the menu a second time and 'menu-hidden' class shows up
            $('.menu-icon-link').click();
            expect(document.body.className).toBe('menu-hidden');
          })
      })

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         // calls loadFeed function asynchronously before testing 
         beforeEach(function(done) {
                loadFeed(0,done);
         })

         // test if feed class has at least one child by checking
         // the length of the children of feed class to be greater than 0 
         it('should have at least a single .entry element', function(done) {
            expect($('.feed').children().length).toBeGreaterThan(0);
            done();
         })

    })

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var feed_1, feed_2;

         // asynchronously call loadFeed for the id 1 feed then with id 2
         beforeEach(function(done) {
            // load feed 1 and store the result in feed_1
            loadFeed(1,function() {
                feed_1 = $('.feed .entry h2').html();
                // load feed 2
                loadFeed(2,function() {
                    done();
                });
            });
         })

         it('content should change when new feed is loaded', function(done) {
                // store the result of loading feed 2 in feed_2.
                // the test fails if the result of feed 2 is obtained inside beforeEach
                feed_2 = $('.feed .entry h2').html();

                expect(feed_2).not.toEqual(feed_1);
                done();
         })
    })
}());
