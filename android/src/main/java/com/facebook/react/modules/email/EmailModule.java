package com.facebook.react.modules.email;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.content.Intent;
import android.content.pm.LabeledIntent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

public class EmailModule extends ReactContextBaseJavaModule {

  public EmailModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "Email";
  }

  @ReactMethod
  public void open(final String title) {
    Intent emailIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("mailto:"));
    PackageManager pm = getCurrentActivity().getPackageManager();

    List<ResolveInfo> resInfo = pm.queryIntentActivities(emailIntent, 0);
    if (resInfo.size() > 0) {
        ResolveInfo ri = resInfo.get(0);
        // First create an intent with only the package name of the first registered email app
        // and build a picked based on it
        Intent intentChooser = pm.getLaunchIntentForPackage(ri.activityInfo.packageName);
        Intent openInChooser = Intent.createChooser(intentChooser, title);

        // Then create a list of LabeledIntent for the rest of the registered email apps
        List<LabeledIntent> intentList = new ArrayList<LabeledIntent>();
        for (int i = 1; i < resInfo.size(); i++) {
            // Extract the label and repackage it in a LabeledIntent
            ri = resInfo.get(i);
            String packageName = ri.activityInfo.packageName;
            Intent intent = pm.getLaunchIntentForPackage(packageName);
            intentList.add(new LabeledIntent(intent, packageName, ri.loadLabel(pm), ri.icon));
        }

        LabeledIntent[] extraIntents = intentList.toArray(new LabeledIntent[intentList.size()]);
        // Add the rest of the email apps to the picker selection
        openInChooser.putExtra(Intent.EXTRA_INITIAL_INTENTS, extraIntents);
        openInChooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getCurrentActivity().startActivity(openInChooser);
      }
  }
}
