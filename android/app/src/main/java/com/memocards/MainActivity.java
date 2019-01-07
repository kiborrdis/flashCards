package com.memocards;

import android.content.Intent;
import android.net.Uri;
import android.os.Debug;
import android.util.Log;

import com.reactnativenavigation.NavigationActivity;

import java.net.URI;
import java.net.URISyntaxException;

public class MainActivity extends NavigationActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    protected String getMainComponentName() {
        return "memoCards";
    }

    @Override
    public void onNewIntent(Intent newIntent) {
        super.onNewIntent(convertIntentIfNeeded(newIntent));
    }

    @Override
    public Intent getIntent() {
        Intent originalIntent = super.getIntent();

        return convertIntentIfNeeded(originalIntent);
    }

    /**
     * It's a hacky way to pass text data from ACTION_SEND intent into react-native Linking api
     * which doesnt have any particular way to handle ACTION_SEND intent and only handles ACTION_VIEW
     */
    private Intent convertIntentIfNeeded(Intent originalIntent) {
        if (originalIntent != null && Intent.ACTION_SEND.equals(originalIntent.getAction()) && originalIntent.hasExtra(Intent.EXTRA_TEXT)) {
            String data = originalIntent.getStringExtra(Intent.EXTRA_TEXT);
            Uri dataCarrier = Uri.fromParts("textcarrier", data, "");

            return new Intent(Intent.ACTION_VIEW, dataCarrier);
        }

        return originalIntent;
    }

}
