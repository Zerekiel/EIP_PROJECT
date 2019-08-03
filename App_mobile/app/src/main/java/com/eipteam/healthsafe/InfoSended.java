package com.eipteam.healthsafe;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;

public class InfoSended extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_send_info);
    }

    public void retour(View v){
        finish();
    }
}
