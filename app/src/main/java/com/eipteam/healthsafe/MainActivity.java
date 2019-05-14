package com.eipteam.healthsafe;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public static void error_msg(Context context, String err_msg) {
        Toast.makeText(context, err_msg, Toast.LENGTH_LONG).show();
    }

    public void connection(View view)
    {
        Intent intent = new Intent(this, ChooseDisplay.class);

        EditText identifiant = (EditText) findViewById(R.id.identifiant);
        String id1 = identifiant.getText().toString();

        EditText password = (EditText) findViewById(R.id.password);
        String id2 = password.getText().toString();

        if ("deprost".equals(id1) && "password".equals(id2)) {
            startActivity(intent);
        }

        else {
            error_msg(getApplicationContext(), "WRONG ID OR PASSWD");
        }
    }
}