package agency.flexible.react.modules.email;

import android.os.Build;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.util.Map;

public class Email extends ReactContextBaseJavaModule {

    private final EmailImpl delegate;

    public Email(ReactApplicationContext reactContext) {
        super(reactContext);
        delegate = new EmailImpl(reactContext);
    }

    @Override
    public String getName() {
        return EmailImpl.NAME;
    }

    @ReactMethod
    public void open(String title, boolean newTask, Promise promise) {
        delegate.open(title,newTask,promise);
    }

    @ReactMethod
    public void openWith(String packageName, Promise promise) {
        delegate.openWith(packageName, promise);
    }

    @ReactMethod
    public void getEmailClients(Promise promise) {
        delegate.getEmailClients(promise);
    }

    @ReactMethod
    public void compose(String title, String to, String subject, String body, String cc, String bcc, Promise promise) {
        delegate.compose(title,to,subject,body,cc,bcc,promise);
    }

    @ReactMethod
    public void composeWith(String packageName, String title, String to, String subject, String body, String cc, String bcc, Promise promise) {
        delegate.composeWith(packageName,title,to,subject,body,cc,bcc,promise);
    }
}
