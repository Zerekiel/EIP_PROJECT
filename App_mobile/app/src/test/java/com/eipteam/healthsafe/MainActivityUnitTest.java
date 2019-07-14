package com.eipteam.healthsafe;


import android.app.Application;
import android.arch.lifecycle.ReportFragment;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.view.View;

import junit.framework.TestCase;

import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.robolectric.Robolectric;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.spy;


@RunWith(PowerMockRunner.class)
@PrepareForTest({ ReportFragment.class })
public class MainActivityUnitTest extends TestCase {
  private Application context;
    private MainActivity ma = new MainActivity();

    @Test(expected = RuntimeException.class)
    public void testOnCreate() {
        PowerMockito.mockStatic(ReportFragment.class);
        MainActivity spyma = spy(new MainActivity());

        Bundle b = new Bundle();
        PersistableBundle pb = new PersistableBundle();
        ma.onSaveInstanceState(b, pb);
        assertNotNull(ma);
        ma = Robolectric.buildActivity(MainActivity.class).create().get();
        View view = new View(context);
        view.setEnabled(false);

        //ma.connection(view);
        //ma.errorMsg(context, "test");

       assertSame(ma, spyma);

        ma.onCreate(b);
        verify(spyma, times(1)).setContentView(R.layout.activity_main);
    }

  //  @Test()
//    public void testConnection() {
        //PowerMockito.mockStatic(ReportFragment.class);

      //  Bundle b = new Bundle();
    //    PersistableBundle pb = new PersistableBundle();
  //      ma.onSaveInstanceState(b, pb);
//        assertNotNull(ma);

//        ma = Robolectric.buildActivity(MainActivity.class).create().get();

//    }
}
