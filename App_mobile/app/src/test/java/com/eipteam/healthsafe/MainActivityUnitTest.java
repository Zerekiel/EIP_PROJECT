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
import static org.powermock.configuration.ConfigurationType.PowerMock;


@RunWith(PowerMockRunner.class)
@PrepareForTest({ ReportFragment.class })
public class MainActivityUnitTest extends TestCase {
  private Application context;
    private MainActivity ma = new MainActivity();

    @Test
    public void testOnCreate() {
        PowerMockito.mockStatic(ReportFragment.class);
        MainActivity spyma = spy(new MainActivity());

    }

    @Test()
    public void testConnection() {
        PowerMockito.mockStatic(ReportFragment.class);

        Bundle b = new Bundle();
        PersistableBundle pb = new PersistableBundle();
        ma.onSaveInstanceState(b, pb);
        assertNotNull(ma);

//        ma = Robolectric.buildActivity(MainActivity.class).create().get();

        }
}
