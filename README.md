
##SOCIAL POST SCRAPER 

EXPECTED INPUT
https://twitter.com/highsteph/status/804000988604399616
https://www.instagram.com/p/BNjEF8DA_-M/?taken-by=aimee_fuller
https://twitter.com/JamieAsnow
https://www.facebook.com/Jamieandersonsnow/photos/a.211038416173.137482.208209591173/10153945604136174/?type=3&theater
https://www.instagram.com/p/BNhux3Ngj7O/?taken-by=jimmy_chin
https://www.instagram.com/p/BNXVDlXBfnj/?taken-by=shawnjohnson
https://twitter.com/ShawnJohnson/status/804370878599430144
https://www.instagram.com/p/BNhux3Ngj7O/?taken-by=jimmy_chin
https://twitter.com/jimkchin/status/806134951926067200
https://www.instagram.com/p/BNUTi3Vghki/?taken-by=jebcorliss
https://www.facebook.com/aimeefullersnow/
https://www.instagram.com/p/BNZ1e5_gqcA/
https://www.facebook.com/jeb.corliss/?fref=ts
https://www.facebook.com/brandonmikesell23/photos/a.841942249259190.1073741828.839057202881028/1144637245656354/?type=3&theater


EXPECTED OUTPUT	

###if twitter
	- Who tweeted it
	- total follower count 
	- likes the tweet has
	- shares the tweet has
	- retweets the tweet has
	- replies the tweet has

###if facebook
	- likes
	- comments
  - shares 
	- total follower count 
  
###if instagram
	- if video include views
	- comment count
	- likes 
	- total followers 

	
	
	STRATEGY IDEA -> scrape post for key information, then hit the API with that info to return the rest
	What if the HTML changes? or what if the site updates? 
	
	IDEA
	Maybe the input can have a settings interface that brings back the scraped data, where the user can then logically find the data hes looking for and 		redo the settings. From there he can execute the API search sucessfully. 