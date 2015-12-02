
import twitter4j.FilterQuery;
import twitter4j.StallWarning;
import twitter4j.Status;
import twitter4j.StatusDeletionNotice;
import twitter4j.StatusListener;
import twitter4j.TwitterObjectFactory;
import twitter4j.TwitterStream;
import twitter4j.TwitterStreamFactory;
import twitter4j.conf.ConfigurationBuilder;

public class StreamTweets {
	

	public static void main(String[] args) {
        
		// OAuth requests for connecting to twitter Streaming API
		ConfigurationBuilder builder = new ConfigurationBuilder();
		builder.setDebugEnabled(true);
		builder.setJSONStoreEnabled(true);
		builder.setOAuthConsumerKey("wFyN6RE0CtTy1lfhEuPy58ucE");
		builder.setOAuthConsumerSecret("eJlhGso0exD3pfOWEDlnX85ZEfuVySh6sjjbBrwi0arIfFghRW");
		builder.setOAuthAccessToken("3751958901-7jOfXjsJYC90tkQQ7NpjsZW9QrjLg13Slyoh9la");
		builder.setOAuthAccessTokenSecret("tWbrek25FWJjWFrmWJLDMBR9m5QZT4ISEROTIuOblwsIf");

		TwitterStream stream = new TwitterStreamFactory(builder.build()).getInstance();
		

		StatusListener listener = new StatusListener() {

			@Override
			public void onException(Exception arg0) {
			}

			@Override
			public void onDeletionNotice(StatusDeletionNotice arg0) {
			}

			@Override
			public void onScrubGeo(long arg0, long arg1) {
			}

			// to get JSON results from twitter API
			@Override
			public void onStatus(Status status) {
				
				String rawTweets = TwitterObjectFactory.getRawJSON(status);		
			    System.out.println(rawTweets);
				}

			@Override
			public void onTrackLimitationNotice(int arg0) {
			}

			@Override
			public void onStallWarning(StallWarning arg0) {
			}
		};
		FilterQuery query = new FilterQuery();

		String keywords[] = { "paris,syria" };

		query.track(keywords);

		stream.addListener(listener);
		stream.filter(query);

	}
}