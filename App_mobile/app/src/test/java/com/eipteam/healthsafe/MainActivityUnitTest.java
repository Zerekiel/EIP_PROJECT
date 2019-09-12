package com.eipteam.healthsafe;


import android.app.Application;
import android.arch.lifecycle.ReportFragment;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.widget.Button;

import junit.framework.TestCase;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.robolectric.Robolectric;
import org.robolectric.RobolectricTestRunner;
import static org.powermock.api.mockito.PowerMockito.spy;


@RunWith(RobolectricTestRunner.class)
@PrepareForTest({ ReportFragment.class })
public class MainActivityUnitTest extends TestCase {
  private Application context;
  private MainActivity ma;
  private ChooseDisplay cd;

    @Before
    public void setUp() throws Exception
    {
        ma = Robolectric.buildActivity(MainActivity.class)
                .create()
                .resume()
                .get();
        cd = Robolectric.buildActivity(ChooseDisplay.class)
                .create()
                .resume()
                .get();
    }

    @Test
    public void testOnCreate() {
        MainActivity spyma = spy(new MainActivity());
        Button btn = (Button) ma.findViewById(R.id.connexion);
        assertNotNull(ma);
        btn.getAccessibilityClassName();
        int id = btn.getId();
        assertEquals(R.id.connexion, id);
        }

    @Test()
    public void testConnection() {
        Bundle b = new Bundle();
        PersistableBundle pb = new PersistableBundle();
        ma.onSaveInstanceState(b, pb);
        assertNotNull(ma);

        }
}
