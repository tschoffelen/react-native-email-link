package agency.flexible.react.modules.email;

import android.os.Build;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Promise;

import java.util.Map;

import agency.flexible.react.modules.email.NativeEmailSpec;

public class Email extends NativeEmailSpec {

    private final EmailImpl delegate;

    public Email(ReactApplicationContext reactContext) {
        super(reactContext);
        delegate = new EmailImpl(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return EmailImpl.NAME;
    }

    @Override
    public void open(String title, boolean newTask, Promise promise) {
        delegate.open(title,newTask,promise);
    }

    @Override
    public void openWith(String packageName, Promise promise) {
        delegate.openWith(packageName,promise);
    }

    @Override
    public void getEmailClients(Promise promise) {
        delegate.getEmailClients(promise);
    }

    @Override
    public void compose(String title, String to, String subject, String body, String cc, String bcc, Promise promise) {
        delegate.compose(title,to,subject,body,cc,bcc,promise);
    }

    @Override
    public void composeWith(String packageName, String title, String to, String subject, String body, String cc, String bcc, Promise promise) {
        delegate.composeWith(packageName,title,to,subject,body,cc,bcc,promise);
    }
}
